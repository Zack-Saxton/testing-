#!/bin/bash
app="$1"
branch="$2"
env="$3"

# Choose the APP
if [ $app != "cac" ]; 
then 
    echo 'Invalid Application Name'
    exit
fi

# Choose a git branch
if [ $branch != "dev" ] && [ $branch != "staging" ] && [ $branch != "prod" ]
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
    pemFile="/home/fidelis.j@zucisystems.com/Documents/creds/MF/MarinerFinance-DevLinux.pem"
    serverName="ubuntu@ec2-18-191-188-41.us-east-2.compute.amazonaws.com"
    gitRepo="git@github.com:zucisystems-dev/MarinerFinance-Website.git"
    appDir="MarinerFinance-Website"
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

# Remove all images and containers
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

#git fetch --all
#git checkout $branch
git fetch --all && git checkout $branch && git pull origin $branch 
latestCommit=$(git rev-parse --short HEAD)

#Dockerise the environment
imageName="fidelisrod/cacdev:${app}-${env}-${latestCommit}"
#docker-compose -f docker-compose.yml up -d --build
#docker build . -t ${imageName}
docker build -f Dockerfile -t ${imageName} .

#Push to dockerhub
docker login
docker push "${imageName}"

#SSH into the environment
#Clean the docker images and containers
#Login to dockerhub and pull the latest image and run it
PARAMS="imageName=\"$imageName\""
ssh -i $pemFile $serverName $PARAMS 'bash' <<'SSHEND'
echo $imageName;

#Remove all images and containers
sudo docker stop $(docker ps -aq)
sudo docker rm -f $(docker ps -a -q)
sudo docker rmi -f $(docker images -a -q)
sudo docker system prune -f

#Login and Pull the docker image and run it
sudo docker login
sudo docker pull $imageName
sudo docker run     -it     --rm     -v ${PWD}:/app     -v /app/node_modules     -p 0.0.0.0:3000:3000     -e CHOKIDAR_USEPOLLING=true  -d $imageName

SSHEND
exit