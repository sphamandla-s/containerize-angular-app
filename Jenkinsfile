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
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    sh "docker login -u $USERNAME -p \$PASSWORD"
                    sh "docker tag containerize-angular-app:${VERSION} $USERNAME/containerize-angular-app:${VERSION}"
                    sh "docker push $USERNAME/containerize-angular-app:${VERSION}"
                }
            }
        }
    }
}
