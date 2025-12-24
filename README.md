# Banking / FinTech System

This is a complete Banking / FinTech System built with **Spring Boot** (Backend) and **React + Vite** (Frontend), orchestrated via **Docker**.

## Project Structure

```bash
banking-fintech-system/
├── backend/                  # Java Spring Boot Application
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/fintech/banking/
│   │   │   │   ├── config/       # Security & App Config
│   │   │   │   ├── controller/   # REST Controllers
│   │   │   │   ├── entity/       # JPA Entities
│   │   │   │   ├── repository/   # Data Access Layer
│   │   │   │   ├── service/      # Business Logic
│   │   │   │   ├── security/     # JWT & Auth Filters
│   │   │   │   └── BankingApplication.java
│   │   │   └── resources/
│   │   │       └── application.yml
│   ├── Dockerfile            # Backend Docker Image Config
│   └── pom.xml               # Maven Dependencies
├── frontend/                 # React + Vite Application
│   ├── src/
│   │   ├── api/              # Axios & API Calls
│   │   ├── auth/             # Auth Context & Guards
│   │   ├── components/       # Reusable UI Components
│   │   ├── pages/            # Page Views (Login, Dashboard, etc.)
│   │   ├── utils/            # Helper Functions
│   │   ├── App.jsx           # Main App Component
│   │   └── main.jsx          # Entry Point
│   ├── Dockerfile            # Frontend Docker Image Config
│   ├── nginx.conf            # Nginx Server Config
│   ├── package.json          # Node Dependencies
│   └── vite.config.js        # Vite Configuration
├── jenkins/
│   └── Jenkinsfile           # CI/CD Pipeline
├── docker-compose.yml        # Orchestration Config
└── README.md                 # Project Documentation
```

## Tech Stack

- **Backend**: Java 17, Spring Boot 3, Spring Security, Spring Data JPA, JWT (JSON Web Tokens).
- **Frontend**: React 18, Vite, TailwindCSS, Axios, React Router.
- **Database**: PostgreSQL (Running in Docker).
- **DevOps**: Docker, Docker Compose, Jenkins.

## Pre-requisites

- Docker & Docker Compose
- Java 17+ (for local backend dev)
- Node.js 18+ (for local frontend dev)

## How to Run

### Using Docker (Recommended)

1.  Open a terminal in the root directory.
2.  Run the following command:
    ```bash
    docker-compose up --build
    ```
    *This might take a few minutes the first time.*

3.  Access the application:
    - **Frontend**: [http://localhost:5173](http://localhost:5173) (or port 80 if via Nginx production build)
    - **Backend API**: [http://localhost:9090](http://localhost:9090)
    - **Swagger Docs**: [http://localhost:9090/swagger-ui/index.html](http://localhost:9090/swagger-ui/index.html)

### Local Development

#### Backend
1.  Navigate to `backend/`.
2.  Run `mvn spring-boot:run`.
    *(Ensure PostgreSQL is running locally or update config to point to Docker DB)*

#### Frontend
1.  Navigate to `frontend/`.
2.  Run `npm install`.
3.  Run `npm run dev`.

## Data Storage

Data is persisted using a Docker Volume named `postgres_data`.
- To access the database: Connect to `localhost:5432`
- **Username**: `postgres`
- **Password**: `postgres`
- **Database**: `banking_db`

## Features

- **Security**: JWT Authentication, Role-based Access Control (USER, ADMIN).
- **Banking**: Account Creation, Deposits, Withdrawals, Transfers.
- **Reporting**: Transaction History, Audit Logs.
- **Background Jobs**: Interest Calculation, Fraud Detection.

## CI/CD Pipeline

The project includes a `Jenkinsfile` for automated deployment using **Jenkins**. The pipeline consists of the following stages:

1.  **Checkout**: Pulls the latest code from the GitHub repository.
2.  **Build Backend**: Compiles the Spring Boot application using Maven (`mvn clean package`).
3.  **Build Docker Images**: Builds the Docker images for Backend and Frontend (`docker-compose build`).
4.  **Test**: Runs unit tests to ensure code stability (`mvn test`).
5.  **Deploy**: Deploys the containers using Docker Compose (`docker-compose up -d`).

### Setting up Jenkins
1.  Install Jenkins and the **Docker Pipeline** plugin.
2.  Create a new **Pipeline** job.
3.  Connect it to your GitHub repository.
4.  Build Now to trigger the pipeline.
