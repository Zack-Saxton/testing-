#!/bin/bash
app="$1"
branch="$2"
env="$3"
instances="$4"

echo "***************************************************************************"
echo "*********************** DEPLOYMENT INFO************************************"
echo "***************************************************************************"
echo "APPLICATION :" $app
echo "ENVIRONMENT :" $env
echo "GIT BRANCH  :" $branch
echo "SPIN INSTANCES" : $instances

# Choose the APP
if [ $app != "cac" ]; 
then 
    echo 'Invalid Application Name'
    exit
fi

# Choose a git branch
if [ $branch != "dev" ] && [ $branch != "staging" ] && [ $branch != "prod" ] && [ $branch !='v1-clean-up' ] && [ $branch !='v1-clean-up-merge-dev' ]
then
    echo 'Invalid Git Branch'
    exit
fi

# Initialise for various environments
dev_env(){
    pemFile="/home/fidelis.j@zucisystems.com/Documents/creds/MF/MarinerFinance-DevLinux.pem"
    serverName="ubuntu@ec2-18-191-188-41.us-east-2.compute.amazonaws.com"
    gitRepo="git@github.com:zucisystems-dev/MarinerFinance-Website.git"
    appDir="MarinerFinance-Website"
}

staging_env(){
    pemFile="/home/fidelis.j@zucisystems.com/Documents/creds/MF/marinerfinance-us-east-1.pem"
    serverName="ubuntu@cac-app1-dev.marinerfinance.io"
    gitRepo="git@github.com:marinerfinance/cac.git"
    appDir="cac"
}

production_env(){
    pemFile="/home/fidelis.j@zucisystems.com/Documents/creds/MF/MarinerFinance-DevLinux.pem"
    serverName="ubuntu@ec2-18-191-188-41.us-east-2.compute.amazonaws.com"
    gitRepo="git@github.com:zucisystems-dev/MarinerFinance-Website.git"
    appDir="MarinerFinance-Website"
}

# Choose an environment
case $env in
    dev)
        echo "*** Deployment to development environment ***"
        # Initialise the variables
        dev_env ;;
    staging)
        echo "*** Deployment to Staging environment ***"
        # Initialise the variables
        staging_env ;;
    prod)
        echo "*** Deployment to Production environment ***"
        # Initialise the variables
        production_env ;;
    *)
        echo "Unknown environment - choose between dev,staging or prod"
        exit
        ;;
esac


echo "***************************************************************************"
echo "*************************** Dockerise *************************************"
echo "***************************************************************************"
# Remove all images and containers (Can be removed if not needed)
docker stop $(docker ps -aq)
docker rm -f $(docker ps -a -q)
docker rmi -f $(docker images -a -q)
docker system prune -f

#Set the temp deployment folder
rm -rfv deploy
mkdir deploy # Need to add code to check if dir already exists
cd deploy

#Clone from git 
git init && git clone $gitRepo
cd $appDir
git fetch --all && git checkout $branch && git pull origin $branch 
latestCommit=$(git rev-parse --short HEAD)

#Dockerise the environment
imageName="marinerfinance/ops:${app}-${env}-${latestCommit}"
docker build -f Dockerfile -t ${imageName} .
echo  "****** Created New Image ****"
echo $imageName;

echo "***************************************************************************"
echo "************** Login to Dockerhub and push to repo ************************"
echo "***************************************************************************"
#Push to dockerhub
docker login
docker push "${imageName}"
echo  "****** Pushed to Dockerhub ****"


echo "***************************************************************************"
echo "*********** SSH to Server & Pull from Dockerhub & Spin instance ***********"
echo "***************************************************************************"
#SSH into the environment
#Clean the docker images and containers
#Login to dockerhub and pull the latest image and run it
PARAMS="imageName=\"$imageName\" env=\"$env\" app=\"$app\" instances=\"$instances\""
ssh -i $pemFile $serverName $PARAMS 'bash' <<'SSHEND'

#Remove all images and containers
sudo docker stop $(sudo docker ps -aq)
sudo docker rm -f $(sudo docker ps -a -q)
sudo docker rmi -f $(sudo docker images -a -q)
sudo docker system prune -f

#Login and Pull the docker image and run it
sudo docker login
sudo docker pull $imageName

for((count=1;count<=$instances;count++))
do
    echo  "****** Spinning Instance ${count}: "
    sudo docker run -dit --name "${app}-${env}-${count}" $imageName
    sleep 5
done

SSHEND
exit
