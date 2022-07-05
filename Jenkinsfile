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
                sh './scripts/test.sh'
            }
            post {
                def summary = junit testResults: '/output/coverage/jest/clover.xml'
                success {
                    slackSend channel: "#deployments", message: "Unit test passed: Summary"
                }
                failure {
                    slackSend channel: "#deployments", message: "Unit test failed: Summary"
                }
            }
        }
    }
    
}