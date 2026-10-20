pipeline {
    agent any

    tools {
        // Must match your tool name in: Manage Jenkins > Tools > NodeJS Installations
        nodejs 'NodeJS 24.21.0'
    }

    parameters {
        choice(
            name: 'TAG',
            choices: ['all', '@smoke', '@regression', '@login'],
            description: 'Select Cucumber tag to execute'
        )
        booleanParam(
            name: 'HEADLESS',
            defaultValue: true,
            description: 'Run browser in headless mode'
        )
        string(
            name: 'APP_URL',
            defaultValue: 'https://tutorialsninja.com/demo/',
            description: 'Target Application URL'
        )
    }

    options {
        timeout(time: 30, unit: 'MINUTES')
        ansiColor('xterm')
        disableConcurrentBuilds()
        timestamps()
    }

    environment {
        CI = 'true'
        TARGET_URL = "${params.APP_URL}"
        HEADLESS = "${params.HEADLESS}"
    }

    stages {
        stage('Checkout Source') {
            steps {
                cleanWs()
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat '''
                    @echo off
                    echo ========================================
                    echo Installing NPM Dependencies
                    echo ========================================
                    call npm ci
                '''
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat '''
                    @echo off
                    echo ========================================
                    echo Installing Playwright Chromium
                    echo ========================================
                    call npx playwright install chromium --with-deps
                '''
            }
        }

        stage('Execute Cucumber BDD Tests') {
            steps {
                script {
                    def tagArg = params.TAG == 'all' ? '' : "--tags \"${params.TAG}\""

                    echo "========================================"
                    echo "Starting Cucumber Test Execution"
                    echo "Tag      : ${params.TAG}"
                    echo "Headless : ${params.HEADLESS}"
                    echo "URL      : ${params.APP_URL}"
                    echo "========================================"

                    withEnv(["URL=${params.APP_URL}", "HEADLESS=${params.HEADLESS}"]) {
                        catchError(buildResult: 'UNSTABLE', stageResult: 'FAILURE') {
                            bat "call npx cucumber-js ${tagArg}"
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            echo "========================================"
            echo "Publishing Cucumber HTML Report"
            echo "========================================"

            publishHTML(target: [
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'reports',
                reportFiles: 'cucumber-report.html',
                reportName: 'Cucumber BDD Test Report'
            ])

            archiveArtifacts(
                artifacts: 'reports/**',
                allowEmptyArchive: true
            )
        }

        success {
            echo 'All Playwright Cucumber scenarios passed successfully.'
        }

        unstable {
            echo 'Test failures detected. Review the Cucumber BDD Test Report.'
        }

        failure {
            echo 'Pipeline execution failed.'
        }
    }
}
