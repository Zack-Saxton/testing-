pipeline {
    agent {
        docker {
            image 'node:lts-bullseye-slim' 
            args '-p 3000:3000' 
        }
    }
    environment {
            CI = 'true'
    }
    stages {
        stage('Build') { 
            steps {
                sh 'npm install' 
            }
        }
        stage('Test') {
            steps {
                script {
                    echo 'Start running unit test automaton'
                    sh '''#!/bin/bash
                        set -x
                        CI=true npm test 2>&1 | tee unit_test_result.txt
                        
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
                        * To know more check log: $BUILD_URL/console
                        "
                        url="https://hooks.slack.com/services/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"
                        curl -X POST -H 'Content-type: application/json' --data '{"text":"'"$message"'"}' "{$url}"

                    '''
                }
            }
        }
    }
    
}