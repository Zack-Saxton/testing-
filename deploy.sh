#!/bin/bash
app="$1"
branch="$2"
env="$3"
instances="$4"

dockerHub=marinerfinance1#

echo "***************************************************************************"
echo "*********************** DEPLOYMENT INFO************************************"
echo "***************************************************************************"
echo "APPLICATION :" $app
echo "GIT BRANCH  :" $branch
echo "ENVIRONMENT :" $env
echo "SPIN INSTANCES" : $instances

# Choose the APP
if [ $app != "cac" ];
then
    echo 'Invalid Application Name'
    exit
fi

# Choose a git branch
if [ $branch != "dev" ] && [ $branch != "qa" ] && [ $branch != "staging" ] && [ $branch != "prod" ]
then
    echo 'Invalid Git Branch'
    exit
fi
#unit test automation script
if [ $branch = "dev" ];
then
    echo "*************************Unit test automation started*************************"
    CI=true npm test 2>&1 | tee unit_test_result.txt
    UNIT_TEST_RESULT='passed'
    TOTAL_TEST_SUITES=$(cat unit_test_result.txt | grep 'Test Suites:')
    PASSED_TESTS=$(cat unit_test_result.txt | grep 'Tests:')
    SNAPSHORT_TESTS=$(cat unit_test_result.txt | grep 'Snapshots:')
    TIME_TAKEN=$(cat unit_test_result.txt | grep 'Time:')

    message="
    *Unit Test Result Summary -: CAC Application*
      * ${TOTAL_TEST_SUITES}
      * ${PASSED_TESTS}
      * ${SNAPSHORT_TESTS}
      * ${TIME_TAKEN}
    "
    url="https://hooks.slack.com/services/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"
    curl -X POST -H 'Content-type: application/json' --data '{"text":"'"$message"'"}' "{$url}"
    SUB='failed'
    case $PASSED_TESTS in
      *"$SUB"*)
        UNIT_TEST_RESULT='failed'
        ;;
    esac

    if [ $UNIT_TEST_RESULT != "passed" ];
    then
        echo 'Unit test automation failed'
        exit
    fi
    echo "*************************Unit test automation end*************************"
fi


if [ "$env" = "prod4" ] || [ "$env" = "prod5" ]
then
  if [ "$env" = "prod4" ]
  then
    serverName="ubuntu@cis-app4-prod.marinerfinance.io"
  else
    if [ "$env" = "prod5" ]
    then
      serverName="ubuntu@cis-app5-prod.marinerfinance.io"
    fi
  fi
  dockerNetwork="prodNetwork"
  env1="prod"
else
  serverName="ubuntu@cis-app1-${env}.marinerfinance.io"
  dockerNetwork="${env}Network"
  env1="${env}"
fi
pemFile=marinerfinance-us-east-1.pem
otherPemFile=~/Code/psa/otherdocs/marinerfinance-us-east-1.pem
deployUser=$(whoami)
hostname="cac-app1-${env1}.marinerfinance.io"
message="$hostname Deployment START from $branch to $env By $deployUser"
url="https://hooks.slack.com/services/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"
curl -X POST -H 'Content-type: application/json' --data '{"text":"'"$message"'"}' "{$url}"

#GIT and PEM Details
#gitRepo="git@github.com:marinerfinance/cac.git"
if [ -f "$pemFile" ];
then
    echo -e "\033[1;34m pemfile was found. \033[0m"
    _PEM_FILE_=$pemFile
else
    echo -e "\033[1;33m  unable to find pemfile locally \033[0m"
    if [ -f "$otherPemFile" ];
    then
        echo -e "\033[1;34m pemfile was found in other directory @=> ($app). \033[0m"
        _PEM_FILE_=$otherPemFile
    else
        echo -e "\033[1;31m Failed => \033[0m (reason): unable to find pemFile in other directory @=> ($app)"
        exit
    fi
fi

echo "***************************************************************************"
echo "*************************** Dockerise *************************************"
echo "***************************************************************************"
# Remove all images and containers (Can be removed if not needed)
# docker stop $(docker ps -aq)
# docker rm -f $(docker ps -a -q)
# docker rmi -f $(docker images -a -q)
# docker system prune -f

##Set the temp deployment folder
#rm -rfv deploy
#mkdir deploy # Need to add code to check if dir already exists
#cd deploy

#Clone from git
#git init && git clone $gitRepo
cd ~/Code/cac
# git fetch --all && git checkout $branch && git pull origin $branch

#echo "git fetch"
git fetch

#echo "git checkout $branch"
git checkout $branch

#echo "git pull"
git pull

#echo "git checkout $env"
if [ "$env1" = "prod" ]
then
    git checkout master
else
  git checkout $env
fi

#echo "git pull"
git pull

#echo "git merge $branch"
git merge $branch --no-edit

#echo "git push"
git push

echo "***************************************************************************"
echo "************** Remove all images from local        ************************"
echo "***************************************************************************"
# docker rmi -f $(docker images -a -q)

latestCommit=$(git rev-parse --short HEAD)
#Dockerise the environment
imageName="marinerfinance/ops:${app}-${env1}-${latestCommit}"
#docker build -f Dockerfile -t ${imageName} .
case $env1 in
  "dev")
    cat ~/.
    docker build -t $imageName  $(for i in `cat ~/.env_cac_dev`; do out+="--build-arg $i " ; done; echo $out;out="") .
    if [ $? != 0 ]; then
      echo -e "\033[1;31m Failed \033[0m => (reason): docker failed  to build image locally"
      exit 1;
    fi
    ;;
  "qa")
    docker build -t $imageName  $(for i in `cat ~/.env_cac_qa`; do out+="--build-arg $i " ; done; echo $out;out="") .
    if [ $? != 0 ]; then
      echo -e "\033[1;31m Failed \033[0m => (reason): docker failed  to build image locally"
      exit 1;
    fi
    ;;
  "staging")
    docker build -t $imageName  $(for i in `cat ~/.env_cac_staging`; do out+="--build-arg $i " ; done; echo $out;out="") .
    if [ $? != 0 ]; then
      echo -e "\033[1;31m Failed \033[0m => (reason): docker failed  to build image locally"
      exit 1;
    fi
    ;;
  "prod")
    docker build -t $imageName  $(for i in `cat ~/.env_cac_prod`; do out+="--build-arg $i " ; done; echo $out;out="") .
    if [ $? != 0 ]; then
      echo -e "\033[1;31m Failed \033[0m => (reason): docker failed  to build image locally"
      exit 1;
    fi
    ;;
esac

echo  "****** Created New Image ****"
echo $imageName;

echo -e "\033[1;36m ********************************************** \033[0m"
echo -e "\033[1;36m * LOGIN INTO DOCKER_HUB                        \033[0m"
echo -e "\033[1;36m ********************************************** \033[0m"

docker login --username=$DOCKERHUB_USER  --password=$DOCKERHUB_PSWD
if [ $? != 0 ]; then
  echo -e "\033[1;31m Failed \033[0m => (reason): docker failed  to login to dockerHub"
  exit 1;
fi

docker push "${imageName}"

if [ $? != 0 ]; then
  echo -e "\033[1;31m Failed \033[0m => (reason): docker failed  to push image"
  exit 1;
fi

echo -e "\033[1;35m * PUSHED IMAGE ID: ($imageName)               \033[0m"

docker rmi $(docker images -q | tail -n +4)

echo -e "\033[1;36m ********************************************** \033[0m"
echo -e "\033[1;36m * TUNNELING INTO EC2 INSTANCE ($app)           \033[0m"
echo -e "\033[1;36m ********************************************** \033[0m"

#ssh -o "StrictHostKeyChecking no" -i $PEM_FILE $serverName << ENDHERE
ssh  -i $_PEM_FILE_ $serverName << ENDHERE
     echo -e "\033[1;36m ********************************************** \033[0m"
     echo -e "\033[1;36m * START stopping all container ($app) and then  \033[0m"
     echo -e "\033[1;36m * removing all  container ($app)                \033[0m"
     echo -e "\033[1;36m ********************************************** \033[0m"
     removeAllContainer=\$(docker ps -aq)
     echo ${removeAllContainer}
     docker rm -f \$removeAllContainer
     echo -e "\033[1;36m ********************************************** \033[0m"
     echo -e "\033[1;36m * removed all running container from : ($app)  \033[0m"
     echo -e "\033[1;36m ********************************************** \033[0m"
     echo -e "\033[1;36m ********************************************** \033[0m"
     echo -e "\033[1;36m * START removing all old images except last 4 : ($app) \033[0m"
     echo -e "\033[1;36m ********************************************** \033[0m"
     docker rmi -f \$(docker images -q | tail -n +4)
     echo -e "\033[1;36m ********************************************** \033[0m"
     echo -e "\033[1;36m * removed all images except last 4 from : ($app) \033[0m"
     echo -e "\033[1;36m ********************************************** \033[0m"
     echo -e "\033[1;36m ********************************************** \033[0m"
     echo -e "\033[1;36m * START Updating server    : ($app)            \033[0m"
     echo -e "\033[1;36m ********************************************** \033[0m"

     sudo apt-get update && sudo apt --fix-broken install && sudo apt-get dist-upgrade -y

     docker login --username=$DOCKERHUB_USER  --password=$DOCKERHUB_PSWD

     if [ $? != 0 ]; then
         echo -e "\033[1;31m Failed \033[0m => (reason): docker failed  to login to dockerHub"
         exit 1;
     fi
     docker push "${imageName}"

   for ((count=1;count<=$instances;count++))
   do
     echo  "****** Spinning Instance "\$count": "
     docker run -dit --env-file=".env" --restart=always --name "${app}"\$count"-${env1}-${latestCommit}" --network $dockerNetwork $imageName
     sleep 5
   done
   sudo reboot
   exit
ENDHERE

#-------------------------------------------------------------------------#
#@ END OF REBOOT
#-------------------------------------------------------------------------#

 # docker inspect -f '{{json .NetworkSettings.Networks}}' ${app}"\$count"-${env}-${latestCommit} | python -m json.tool
 # curl_cmd=$(curl -w "\n" --insecure -X GET https://${app}-${env}.marinerfinance.io)

 # echo -e "\033[1;36m ********************************************** \033[0m"
 # echo -e "\033[1;36m * verifying that ${app} is up via API  \033[0m"
 # echo -e "\033[1;36m ********************************************** \033[0m"

 # echo -e "\033[1;32m *  $curl_cmd  \033[0m"

message="$hostname Deployment END from $branch to $env By $deployUser"
url="https://hooks.slack.com/services/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"
curl -X POST -H 'Content-type: application/json' --data '{"text":"'"$message"'"}' "{$url}"

echo -e "\033[1;36m ********************************************** \033[0m"
echo -e "\033[1;36m * Deployment ($app)  Completed Successfully    \033[0m"
echo -e "\033[1;36m ********************************************** \033[0m"
