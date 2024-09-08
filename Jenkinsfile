pipeline {
    agent any

    environment {
        // Make sure the 'package.json' file is present in the workspace
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

    }
}
