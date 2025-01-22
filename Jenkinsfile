pipeline {
    agent any
    tools {
        nodejs 'NodeJS_20' // Укажите имя версии Node.js, настроенной в Jenkins
    }
    environment {
        NEXT_PUBLIC_API_URL = 'https://example.com/api' // Укажите переменные окружения
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Prepify-app/prepify_next'
            }
        }
        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build application') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Deploy application') {
            steps {
                // Настройте путь развертывания
                sh '''
                mkdir -p /var/lib/jenkins/workspace/next-app
                cp -r .next /var/lib/jenkins/workspace/next-app
                cp package.json /var/lib/jenkins/workspace/next-app
                cd /var/lib/jenkins/workspace/next-app
                npm install --production
                '''
            }
        }
        stage('Restart application') {
            steps {
                // Используем PM2 или другую систему для запуска Next.js
                sh '''
                pm2 delete next-app || true
                pm2 start npm --name "next-app" -- start
                pm2 save
                '''
            }
        }
    }
    post {
        success {
            echo 'Deployment completed successfully!'
        }
        failure {
            echo 'Deployment failed!'
        }
    }
}
