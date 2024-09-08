pipeline {
    agent any

    parameters {
        choice(name: 'ENVIRONMENT', choices: ['dev', 'tst', 'prod'], description: 'Select environment')
    }

    environment {
        DOCKER_HUB_CREDENTIALS = credentials('docker-hub-credentials') // Docker Hub credentials stored in Jenkins
        IMAGE_NAME = "your-dockerhub-username/containerize-angular-app:${ENVIRONMENT}"
    }

    stages {
        stage('Clone Repository') {
            steps {
                // Clone the repository (Jenkins does this automatically with "Pipeline script from SCM")
                echo 'Repository cloned by Jenkins SCM'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install npm dependencies
                sh 'npm install'
            }
        }

        stage('Build Angular App') {
            steps {
                script {
                    // Build Angular app based on the selected environment
                    sh "ng build --configuration ${params.ENVIRONMENT} --base-href /containerize-angular-app/"
                }
            }
        }

        stage('Dockerize') {
            steps {
                script {
                    // Build Docker image
                    sh """
                    docker build -t ${env.IMAGE_NAME} .
                    """
                }
            }
        }

        stage('Push to DockerHub') {
            steps {
                script {
                    // Log in to DockerHub and push the Docker image
                    sh """
                    echo ${env.DOCKER_HUB_CREDENTIALS_PSW} | docker login -u ${env.DOCKER_HUB_CREDENTIALS_USR} --password-stdin
                    docker push ${env.IMAGE_NAME}
                    """
                }
            }
        }

        // stage('Deploy') {
        //     steps {
        //         script {
        //             // Assuming you have Kubernetes set up for deployment
        //             sh """
        //             kubectl set image deployment/containerize-angular-app containerize-angular-app=${env.IMAGE_NAME} --namespace=${params.ENVIRONMENT}
        //             """
        //         }
        //     }
        // }
    }

    post {
        always {
            // Cleanup Docker images locally
            sh 'docker rmi ${env.IMAGE_NAME}'
        }
    }
}
