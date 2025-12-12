# Daily Drive - AWS CI/CD Pipeline Demo

> A complete CI/CD pipeline implementation using AWS CodePipeline, demonstrating automated deployment from GitHub to AWS S3 with CloudFront CDN.

[![AWS](https://img.shields.io/badge/AWS-CodePipeline-orange?logo=amazon-aws)](https://aws.amazon.com/codepipeline/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/SREEGEETHES/daily-drive)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2.7-646CFF?logo=vite)](https://vitejs.dev/)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Technologies Used](#technologies-used)
- [CI/CD Pipeline](#cicd-pipeline)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Screenshots](#screenshots)
- [Key Learnings](#key-learnings)

---

## 🎯 Overview

This project demonstrates a complete **CI/CD pipeline** implementation using AWS services. It showcases the entire software development lifecycle from code commit to production deployment, featuring:

- ✅ Automated builds on every commit
- ✅ Continuous deployment to AWS S3
- ✅ Global content delivery via CloudFront CDN
- ✅ Infrastructure as Code with buildspec.yml
- ✅ Docker containerization support

**Live Demo**: [Insert your CloudFront or S3 URL here]

---

## 🏗️ Architecture

```
┌─────────────┐      ┌──────────────┐      ┌─────────────┐      ┌──────────┐
│   GitHub    │─────▶│ CodePipeline │─────▶│  CodeBuild  │─────▶│    S3    │
│ Repository  │      │   (Source)   │      │   (Build)   │      │ (Deploy) │
└─────────────┘      └──────────────┘      └─────────────┘      └──────────┘
                                                                       │
                                                                       ▼
                                                              ┌─────────────┐
                                                              │ CloudFront  │
                                                              │    (CDN)    │
                                                              └─────────────┘
                                                                       │
                                                                       ▼
                                                                  End Users
```

### Pipeline Flow

1. **Source Stage**: Triggered on push to `main` branch
2. **Build Stage**: CodeBuild compiles React app using Vite
3. **Deploy Stage**: Static files deployed to S3 bucket
4. **Distribution**: CloudFront serves content globally with HTTPS


---

## 🛠️ Technologies Used

### Frontend
- **React 18.3.1** - UI library
- **Vite 7.2.7** - Build tool and dev server
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Reusable component library

### AWS Services
- **CodePipeline** - CI/CD orchestration
- **CodeBuild** - Build automation
- **S3** - Static website hosting
- **CloudFront** - Content delivery network
- **IAM** - Access management

### DevOps
- **Docker** - Containerization
- **Git/GitHub** - Version control
- **buildspec.yml** - Build configuration

---

## 🚀 CI/CD Pipeline

### Pipeline Stages

#### 1. Source Stage
- **Trigger**: Push to GitHub `main` branch
- **Provider**: GitHub (OAuth connection)
- **Output**: Source code artifact

#### 2. Build Stage
- **Provider**: AWS CodeBuild
- **Runtime**: Amazon Linux 2, Node.js 20
- **Process**:
  ```bash
  npm ci                    # Install dependencies
  npm run build            # Build production bundle
  ```
- **Output**: Optimized static files in `dist/`

#### 3. Deploy Stage
- **Provider**: Amazon S3
- **Action**: Upload static files to S3 bucket
- **Configuration**: Extract files before deploy
- **Result**: Website accessible via S3 endpoint

### Build Configuration (`buildspec.yml`)

```yaml
version: 0.2

phases:
  install:
    runtime-versions:
      nodejs: 20
    commands:
      - npm ci
  
  build:
    commands:
      - npm run build
  
  post_build:
    commands:
      - ls -la dist/

artifacts:
  files:
    - '**/*'
  base-directory: dist

cache:
  paths:
    - 'node_modules/**/*'
```

---

## 📁 Project Structure

```
daily-drive/
├── src/                    # React source code
├── public/                 # Static assets
├── buildspec.yml          # CodeBuild configuration
├── Dockerfile             # Docker container config
├── package.json           # Dependencies
├── vite.config.ts         # Vite configuration
├── tailwind.config.ts     # Tailwind CSS config
└── README.md              # This file
```

---

## ⚙️ Setup Instructions

### Prerequisites
- AWS Account with appropriate permissions
- GitHub account
- Node.js 20+ installed locally

### Local Development

```bash
# Clone repository
git clone https://github.com/SREEGEETHES/daily-drive.git
cd daily-drive

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

### AWS Pipeline Setup

#### 1. Create S3 Bucket
```
Bucket name: daily-drive-website-[unique-id]
Region: Your preferred region
Block public access: OFF
Static website hosting: ENABLED
Index document: index.html
Error document: index.html
```

#### 2. Configure CloudFront Distribution
```
Origin: S3 bucket website endpoint
Viewer protocol: Redirect HTTP to HTTPS
Default root object: index.html
Custom error response: 404 → /index.html (200)
```

#### 3. Create CodeBuild Project
```
Project name: daily-drive-build
Source: GitHub repository
Environment: Amazon Linux 2, Node.js 20
Buildspec: buildspec.yml
Artifacts: S3 bucket
```


#### 4. Create CodePipeline
```
Pipeline name: daily-drive-pipeline
Source: GitHub (OAuth)
Build: CodeBuild project
Deploy: S3 bucket
```

---

## 📸 Screenshots

### Pipeline Execution
<!-- INSERT PIPELINE EXECUTION SCREENSHOT HERE -->
![Pipeline Execution](<img width="1919" height="915" alt="Screenshot 2025-12-12 163812" src="https://github.com/user-attachments/assets/b1bf6e7b-9c9e-4395-8ec8-bed581cd159f" />
png)

### Build Logs
<!-- INSERT BUILD LOGS SCREENSHOT HERE -->
![Build Logs](screenshots/build-logs.png)

### Deployed Application
<!-- INSERT DEPLOYED APP SCREENSHOT HERE -->
![Deployed Application](screenshots/deployed-app.png)

---

## 🎓 Key Learnings

### AWS Services
- ✅ Configured multi-stage CI/CD pipeline with CodePipeline
- ✅ Automated builds using CodeBuild with custom buildspec
- ✅ Deployed static websites to S3 with proper permissions
- ✅ Set up CloudFront for global CDN distribution
- ✅ Managed IAM roles and policies for service integration

### DevOps Practices
- ✅ Implemented Infrastructure as Code (buildspec.yml)
- ✅ Automated deployment on every commit
- ✅ Configured build caching for faster builds
- ✅ Set up proper artifact management
- ✅ Implemented SPA routing with S3 error documents

### Troubleshooting Skills
- ✅ Debugged S3 deployment path issues
- ✅ Configured proper S3 static website hosting
- ✅ Resolved CloudFront caching and routing issues
- ✅ Fixed CodePipeline artifact extraction settings

---

## 🔄 Continuous Deployment

Every push to the `main` branch automatically:
1. Triggers CodePipeline
2. Pulls latest code from GitHub
3. Builds production bundle with Vite
4. Deploys to S3
5. Invalidates CloudFront cache (if configured)
6. Makes changes live in ~2-3 minutes

**Demo**: Make a change, push to GitHub, and watch it deploy automatically!

---

## 🐳 Docker Support

The project includes a multi-stage Dockerfile for containerized deployment:

```dockerfile
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Build and run**:
```bash
docker build -t daily-drive .
docker run -p 8080:80 daily-drive
```

---

## 📊 Performance Metrics

- **Build Time**: ~1-2 minutes
- **Deployment Time**: ~30 seconds
- **Total Pipeline Duration**: ~2-3 minutes
- **CloudFront Edge Locations**: 400+ globally
- **Cost**: ~$1-5/month (AWS Free Tier eligible)

---

## 🔗 Links

- **GitHub Repository**: https://github.com/SREEGEETHES/daily-drive
- **Live Demo**: http://daily-drive-cicd.s3-website.ap-south-1.amazonaws.com/

---

## 👤 Author

**Jasprit Sree**

- GitHub: [@SREEGEETHES](https://github.com/SREEGEETHES)

---

## 📝 License

This project is for educational and portfolio demonstration purposes.

---

## 🙏 Acknowledgments

- AWS Documentation for comprehensive guides
- React and Vite communities for excellent tooling
- shadcn/ui for beautiful component library

---

**⭐ If you found this project helpful, please consider giving it a star!**
