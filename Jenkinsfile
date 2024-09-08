pipeline {
    agent any

    parameters {
        choice(name: 'ENVIRONMENT', choices: ['dev', 'tst', 'prod'], description: 'Select environment')
    }

    environment {
        DOCKER_HUB_CREDENTIALS = credentials('docker-hub-credentials') // Ensure this is the correct ID of your Docker Hub credentials in Jenkins
        IMAGE_NAME = "sphamandla38/containerize-angular-app:${BUILD_NUMBER}"
    }

    stages {
        stage('Clone Repository') {
            steps {
                echo 'Repository cloned by Jenkins SCM'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build Angular App') {
            steps {
                sh "ng build --configuration ${params.ENVIRONMENT} --base-href /containerize-angular-app/"
            }
        }

        stage('Docker Build Image') {
            steps {
                sh 'docker build -t containerize-angular-app ./.dockerfiles' // Replace with the actual context directory
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([string(credentialsId: 'docker-hub-access-token', variable: 'DOCKER_ACCESS_TOKEN')]) {
                    sh '''
                    echo $DOCKER_ACCESS_TOKEN | docker login -u sphamandla38 --password-stdin
                    docker tag containerize-angular-app sphamandla38/containerize-angular-app:${BUILD_NUMBER}
                    docker push sphamandla38/containerize-angular-app:${BUILD_NUMBER}
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'We will deploy to k8s later'
            }
        }
    }

    post {
        always {
            node {
                sh 'docker rmi sphamandla38/containerize-angular-app:${BUILD_NUMBER}'
            }
        }
    }
}
