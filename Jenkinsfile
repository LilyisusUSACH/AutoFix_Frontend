pipeline{
    agent any
    stages{
        stage("insstalling dependencies"){
            steps{
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/LilyisusUSACH/AutoFix_Frontend.git']])
                dir("./"){
                    sh "sh ./npm install"
                }
            }
        }
         stage("Build "){
            steps{
                dir("./"){
                    script{
                        sh "sh ./npm run build"
                    }
                }
            }
        stage("Build and Push Docker"){
            steps{
                dir("./"){
                    script{
                        withCredentials([string(credentialsId: 'password', variable: 'pass')]){
                            sh 'docker login -u lilyisus -p ${pass}'
                            sh "docker buildx build --push --platform linux/amd64,linux/arm64 -t lilyisus/autofixcarehubfrontendjenks  -f Dockerfile ."
                        }
                    }
                }
            }
        }
    }