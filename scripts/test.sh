#!/usr/bin/env sh

echo 'The following "npm" command (if executed) installs the "cross-env"'
echo 'dependency into the local "node_modules" directory, which will ultimately'
echo 'be stored in the Jenkins home directory. As described in'
echo 'https://docs.npmjs.com/cli/install, the "--save-dev" flag causes the'
echo '"cross-env" dependency to be installed as "devDependencies". For the'
echo 'purposes of this tutorial, this flag is not important. However, when'
echo 'installing this dependency, it would typically be done so using this'
echo 'flag. For a comprehensive explanation about "devDependencies"'
set -x
# npm install --save-dev cross-env
set +x

echo 'The following "npm" command tests that your simple Node.js/React'
echo 'application renders satisfactorily. This command actually invokes the test'
set -x
CI=true npm test 2>&1 | tee unit_test_result.txt

TOTAL_TEST_SUITES=$(cat unit_test_result.txt | grep 'Test Suites:')  
PASSED_TESTS=$(cat unit_test_result.txt | grep 'Tests:') 
SNAPSHORT_TESTS=$(cat unit_test_result.txt | grep 'Snapshots:') 
TIME_TAKEN=$(cat unit_test_result.txt | grep 'Time:')
echo "BUILD_NUMBER" :: $BUILD_NUMBER
echo "BUILD_ID" :: $BUILD_ID
echo "BUILD_DISPLAY_NAME" :: $BUILD_DISPLAY_NAME
echo "JOB_NAME" :: $JOB_NAME
echo "JOB_BASE_NAME" :: $JOB_BASE_NAME
echo "BUILD_TAG" :: $BUILD_TAG
echo "EXECUTOR_NUMBER" :: $EXECUTOR_NUMBER
echo "NODE_NAME" :: $NODE_NAME
echo "NODE_LABELS" :: $NODE_LABELS
echo "WORKSPACE" :: $WORKSPACE
echo "JENKINS_HOME" :: $JENKINS_HOME
echo "JENKINS_URL" :: $JENKINS_URL
echo "BUILD_URL" ::$BUILD_URL
echo "JOB_URL" :: $JOB_URL
message="
*Unit Test Result Summary -: CAC Application*
  * ${TOTAL_TEST_SUITES}
  * ${PASSED_TESTS}
  * ${SNAPSHORT_TESTS}
  * ${TIME_TAKEN} 
"
url="https://hooks.slack.com/services/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"
curl -X POST -H 'Content-type: application/json' --data '{"text":"'"$message"'"}' "{$url}"
