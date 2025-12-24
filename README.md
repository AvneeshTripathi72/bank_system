# Banking / FinTech System

This is a complete Banking / FinTech System built with Spring Boot (Backend) and React + Vite (Frontend), orchestrated via Docker.

## Project Structure

- **backend/**: Java Spring Boot application (API, Security, Database interactions).
- **frontend/**: React application (UI, Auth, Dashboard).
- **docker-compose.yml**: Deployment configuration.

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
3.  Access the application:
    - **Frontend**: http://localhost:5173
    - **Backend API**: http://localhost:8080
    - **Swagger Docs**: http://localhost:8080/swagger-ui/index.html

### Local Development

#### Backend
1.  Navigate to `backend/`.
2.  Run `mvn spring-boot:run`.

#### Frontend
1.  Navigate to `frontend/`.
2.  Run `npm install`.
3.  Run `npm run dev`.

## Features
- **Security**: JWT Authentication, Role-based Access Control (USER, ADMIN).
- **Banking**: Account Creation, Deposits, Withdrawals, Transfers.
- **Reporting**: Transaction History, Audit Logs.
- **Background Jobs**: Interest Calculation, Fraud Detection.

## Tech Stack
- **Backend**: Spring Boot 3, Spring Security, JPA, PostgreSQL, JJWT.
- **Frontend**: React, Vite, TailwindCSS, Axios.
