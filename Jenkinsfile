pipeline {
    agent any
    stages {
        stage('Ready for ruby') {
            steps {
                sh('''#!/bin/zsh -l
                     source ${HOME}/.zshrc
                     bundle install
                ''')
            }
        }
        stage('Ready for node') { 
            steps {
                nodejs('Node-v20.15.1') {
                    sh 'npm install' 
                }
            }
        }
        stage('Build android release apk') { 
            steps {
                nodejs('Node-v20.15.1') {
                    sh('''#!/bin/zsh -l
                         source ${HOME}/.zshrc
                         npm run android-build 
                    ''')
                }
            }
        }

    }
}
