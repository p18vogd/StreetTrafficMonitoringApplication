# Spring Boot Application with Java 17, Maven, and Docker Compose

## Overview

This is a Spring Boot application built with Java 17 and managed by Maven. The application is containerized using Docker, and Docker Compose is used for orchestrating the containers.

## Prerequisites

- Java 17 (Make sure to have Java 17 installed)
- Maven (https://maven.apache.org/download.cgi)
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

3. **Build Docker Image:**

    ```bash
    docker build -t your-docker-image-name .
    ```

4. **Run Docker Compose:**

    ```bash
    docker-compose up -d
    ```

5. **Access the Application:**

   The Spring Boot application will be available at [http://localhost:8080](http://localhost:8080).

## Project Structure

- `src/`: Contains the source code of the Spring Boot application.
- `pom.xml`: Maven project configuration file.
- `Dockerfile`: Docker configuration file for building the application image.
- `docker-compose.yml`: Docker Compose configuration for orchestrating containers.

## Customize Configuration

- You can customize application properties in `src/main/resources/application.properties`.
- Docker Compose configurations can be adjusted in `docker-compose.yml`.

## Additional Notes

- Ensure that the required ports are available and not in use.
- Make sure to update sensitive information and credentials in the configuration files.

## Contributing

If you'd like to contribute, please fork the repository and create a pull request. You can also create issues for bug reports or feature requests.
