pipeline {
    agent any

    tools {
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
        string(
            name: 'RECIPIENT_EMAIL',
            defaultValue: 'holkarmahesh@outlook.com',
            description: 'Recipient Email Address for Test Reports'
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
        IS_HEADLESS = "${params.HEADLESS}"
    }

    stages {
        stage('Checkout Source') {
            steps {
                cleanWs()
                checkout scm
            }
        }

        stage('Install Dependencies & Browsers') {
            steps {
                bat '''
                    @echo off
                    echo ========================================
                    echo Installing NPM Packages and Playwright
                    echo ========================================
                    call npm ci
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
            echo "Publishing HTML Report..."
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

            echo "Sending Execution Email with Attached HTML Report..."
            emailext (
                to: "${params.RECIPIENT_EMAIL}",
                subject: "Jenkins Test Execution: ${currentBuild.currentResult} - Job: ${env.JOB_NAME} [#${env.BUILD_NUMBER}]",
                mimeType: 'text/html',
                body: """
                    <!DOCTYPE html>
                    <html>
                    <body>
                        <h2 style="color: #2c3e50;">Playwright Cucumber BDD Execution Summary</h2>
                        <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
                            <tr style="background-color: #f2f2f2;">
                                <td style="padding: 8px; border: 1px solid #ddd;"><strong>Job Name</strong></td>
                                <td style="padding: 8px; border: 1px solid #ddd;">${env.JOB_NAME}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px; border: 1px solid #ddd;"><strong>Build Number</strong></td>
                                <td style="padding: 8px; border: 1px solid #ddd;">#${env.BUILD_NUMBER}</td>
                            </tr>
                            <tr style="background-color: #f2f2f2;">
                                <td style="padding: 8px; border: 1px solid #ddd;"><strong>Build Status</strong></td>
                                <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">${currentBuild.currentResult}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px; border: 1px solid #ddd;"><strong>Executed Tag</strong></td>
                                <td style="padding: 8px; border: 1px solid #ddd;">${params.TAG}</td>
                            </tr>
                            <tr style="background-color: #f2f2f2;">
                                <td style="padding: 8px; border: 1px solid #ddd;"><strong>Console Output</strong></td>
                                <td style="padding: 8px; border: 1px solid #ddd;"><a href="${env.BUILD_URL}">View Console Logs</a></td>
                            </tr>
                        </table>
                        <p><em>The detailed <code>cucumber-report.html</code> has been attached directly to this email.</em></p>
                    </body>
                    </html>
                """,
                attachmentsPattern: 'reports/cucumber-report.html'
            )
        }
    }
}
