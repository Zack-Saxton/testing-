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
                    GIT_COMMIT_EMAIL = sh (
                            script: './scripts/test.sh',
                            returnStdout: true
                        ).trim()
                        echo "Git committer email: ${GIT_COMMIT_EMAIL}"
                }
            }
            post {
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