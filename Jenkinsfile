pipeline {
    agent any

    environment {
        // Make sure the 'package.json' file is present in the workspace
        package_json_data = readJSON file: 'package.json'
        VERSION = "${package_json_data.version}"
    }

    parameters {
        choice(name: 'ENVIRONMENT', choices: ['DEV', 'TST', 'PRE', 'PROD'], description: 'Deployment Environment')
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
                    def config = ''

                    switch (params.ENVIRONMENT) {
                        case 'DEV':
                            config = 'development'
                            break
                        case 'TST':
                            config = 'tst'
                            break
                        case 'PRE':
                            config = 'pre'
                            break
                        case 'PROD':
                            config = 'production'
                            break
                        default:
                            error "Unknown environment: ${params.ENVIRONMENT}"
                    }
                sh "ng build --configuration ${config} --base-href /containerize-angular-app/"
            }
        }

    }
}
