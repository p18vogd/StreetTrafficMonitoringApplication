# Spring Boot - Angular Application with Java 17, Maven, and Docker Compose

## Overview
This is a full-stack application featuring a Spring Boot backend built with Java 17 and managed by Maven. Frontend is build in Angular utilizes the Material library for UI components and Chart.js for chart visualization. The entire application is containerized using Docker, and Docker Compose is used for orchestrating the containers.
## Prerequisites

- Java 17 (Make sure to have Java 17 installed)
- Maven (https://maven.apache.org/download.cgi)
- Node.js 16.2.10 (https://nodejs.org/)
- Angular CLI 16.2.12 (https://angular.io/guide/setup-local)
- Docker (https://docs.docker.com/get-docker/)
- Docker Compose (https://docs.docker.com/compose/install/)

## Getting Started

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/p18vogd/StreetTrafficMonitoringApplication.git
    ```

2. **Build the Application:**

    ```bash
    cd TrafficProject
    mvn clean install -DskipTests
    ```

3. **Build Angular Application:**

    ```bash
    cd frontend
    npm install
    ng build
    ```

4. **Build Docker Image:**

    ```bash
    docker build -t traffic-app .
    ```

5. **Run Docker Compose:**

    ```bash
    docker-compose up -d
    ```

6. **Access the Application:**

   The Spring Boot application will be available at [http://localhost:8080](http://localhost:8080).

   The Angular application will be available at [http://localhost:4200](http://localhost:4200).

## Project Structure

- `backend/`: Contains the source code of the Spring Boot application.
- `frontend/`: Contains the Angular frontend application.
- `pom.xml`: Maven project configuration file.
- `Dockerfile`: Docker configuration file for building the application image.
- `docker-compose.yml`: Docker Compose configuration for orchestrating containers.

## Customize Configuration

- You can customize application properties in `src/main/resources/application.properties`.
- Docker Compose configurations can be adjusted in `docker-compose.yml`.

## Additional Notes

- Ensure that the required ports are available and not in use.
- Make sure to update sensitive information and credentials in the configuration files.
- Make sure to update `ApplicatonHosts.ts` in `frontend/` depending on the port backend is running .

## Contributing

If you'd like to contribute, please fork the repository and create a pull request. You can also create issues for bug reports or feature requests.
