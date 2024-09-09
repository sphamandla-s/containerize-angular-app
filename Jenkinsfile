pipeline {
    agent any

    environment {
        package_json_data = readJSON file: 'package.json'
        VERSION = "${package_json_data.version}"
    }

    parameters {
        choice(name: 'ENVIRONMENT', choices: ['development', 'tst', 'pre', 'production'], description: 'Deployment Environment')
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
                sh "docker build -t containerize-angular-app:${VERSION} ."
            }
        }


        stage('Push Image to Docker Hub') {
            steps {
               withCredentials([string(credentialsId: 'docker-hub-access-token', variable: 'DOCKER_ACCESS_TOKEN')]) {
                    sh "echo $DOCKER_ACCESS_TOKEN | docker login -u sphamandla38 --password-stdin"
                    sh "docker tag containerize-angular-app:${VERSION} sphamandla38/containerize-angular-app:${VERSION}"
                    sh "docker push sphamandla38/containerize-angular-app:${VERSION}"
                }
            }
        }
        
    }
}
