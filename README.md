# Bogazici University SWE-574

[![CircleCI](https://circleci.com/gh/altugcagri/boun-swe-574/tree/master.svg?style=svg)](https://circleci.com/gh/altugcagri/boun-swe-574/tree/master)

[![Quality gate](https://sonarcloud.io/api/project_badges/quality_gate?project=altugcagri_boun-swe-574)](https://sonarcloud.io/dashboard?id=altugcagri_boun-swe-574)


# Bespoke
                                      Boğaziçi University Software Engineering Department

                                       SWE 574 - Software Development As A Team 2019/Fall
                                    
                                  
## Installation

In order to install and run the backend project [Java](https://www.java.com) Jdk v11+, [Gradle](https://gradle.org/) and [Postgresql database](https://www.postgresql.org/)  must be installed.

**Note that:** Postgresql database is not mandatory. Any other database can be used. However database driver dependencies must be added to build.gradle file and database configurations must be added to application.properties file.

Database configuration explained below.

In order to install and run the frontend project [Node](https://nodejs.org/en/) must be istalled

Set JAVA_HOME like "C:\Program Files\Java\jdk-11.0.2", "bin" folder is not required. Otherwise gradle tasks can fail.

In order to run the projects on docker environment [Docker](https://docs.docker.com/) must be installed.

After installation  of Java, Gradle and Docker, you can clone the project from the [repository](https://github.com/altugcagri/boun-swe-574.git) into your workspace.

## Build BackEnd

After cloning the project go to workspace and run the gradle command:

```sh
$ .\backend\gradle build
```

in order to run tests run the gradle command:

```sh
$ .\backend\gradle test
```

Builds the backend for production to the `backend/build/libs/`folder as `com.fellas.bespoke-0.0.1-SNAPSHOT.jar`.<br>

## Build FrontEnd

Not implemented yet

## Database Configuration

In order to make database configurations for local environment, you should open `backend\src\main\resources\applicaion-db-dev.properties` file and change the parameters below. After making changes you should run the application with dev profile. Running with profiles is explaned under running the backend sections

```sh
spring.datasource.url= jdbc:postgresql://{DATABASE_URL}/{DATABASE_NAME}
spring.datasource.username= {USERNAME_NAME}
spring.datasource.password= {PASSWORD}
```

`{DATABASE_URL}` is the url of the database. it is mostly `localhost:5432` for the local environments

`{DATABASE_NAME}` is the name of the database that you created on database server for the appication. If you did not, first [create a database on the server](https://www.postgresql.org/docs/current/sql-createdatabase.html). 

`{USERNAME_NAME}` is the username of your database.

`{PASSWORD}` is the password of your database.

In order to se database configurations for prod environment, you should open `backend\src\main\resources\applicaion-db-prod.properties` file. You should not change anything in this file. The parameters defined below should be defined as environment varible on the server. You should run the application with prod profile. Running with profiles is explaned under running the backend sections

```sh
spring.datasource.url=${DATABASE_HOST}
spring.datasource.username=${DATABASE_USER_NAME}
spring.datasource.password=${DATABASE_PASS}
```

`${DATABASE_HOST}` is the datasource url of the database. it must be defined as environment varible on the server named `DATABASE_HOST`. It is constracted like `jdbc:postgresql://{DATABASE_URL}/{DATABASE_NAME}`. If you did not create database, first [create a database on the server](https://www.postgresql.org/docs/current/sql-createdatabase.html). 

`{DATABASE_USER_NAME}` is the username of your database. it must be defined as environment varible on the server named `DATABASE_USER_NAME`

`${DATABASE_PASS}` is the password of your database. it must be defined as environment varible on the server named `DATABASE_PASS`

Please see to create [environemnt variles](https://www.geeksforgeeks.org/environment-variables-in-linux-unix/) on the server.

If you like to use another database please [see](https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-sql.html)

## Run BackEnd Without Docker

After building the project running the project requires the steps below;

### Development environment:

```sh
$ java -jar -Dspring.profiles.active=dev {Jar_File_Location}/com.altugcagri.smep-0.0.1-SNAPSHOT.jar
```

`{Jar_File_Location}` is the directory where you keep your jar file. Please change it according to your settings

It runs the backend project in dev profile. It means that application will read  `backend\src\main\resources\applicaion-db-dev.properties` file for connectting to the your development database (most probably local database). 

### Production environment:

```sh
$ nohup java -jar -Dspring.profiles.active=prod {Jar_File_Location}/com.altugcagri.smep-0.0.1-SNAPSHOT.jar &
```

`{Jar_File_Location}` is the directory where you keep your jar file. Please change it according to your settings

It runs the backend project in prod profile. It means that application will read  `backend\src\main\resources\applicaion-db-prod.properties` file for connectting to production database. 

Application writes the log to nohup.out file which is placed where the jar is located.

## Run FrontEnd Without Docker

Not implemented yet!

### Development Environment:


### Development Environment:


## Build and Run With Docker

**Note That:** Docker files is constructed for production mode. You cannot run docker files in your local environemt. You have to [set database environment](https://docs.docker.com/engine/reference/builder/#env) variables explained above before building image of backend and running containers.

### Build image 

BackEnd:

```sh
$ docker build -f Dockerfile --tag={ContainerName} .
```

### Run Container

BackEnd:

```sh
$ docker run -p 8080:8080 {ContainerName}
```

### Guides
The following guides illustrates how to use certain features concretely:

* [Building a RESTful Web Service](https://spring.io/guides/gs/rest-service/)
* [Building REST services with Spring](https://spring.io/guides/tutorials/bookmarks/)
* [Handling Form Submission](https://spring.io/guides/gs/handling-form-submission/)
* [Securing a Web Application](https://spring.io/guides/gs/securing-web/)
* [Spring Boot and OAuth2](https://spring.io/guides/tutorials/spring-boot-oauth2/)
* [Authenticating a User with LDAP](https://spring.io/guides/gs/authenticating-ldap/)
* [Accessing Data with JPA](https://spring.io/guides/gs/accessing-data-jpa/)
* [Building a RESTful Web Service with Spring Boot Actuator](https://spring.io/guides/gs/actuator-service/)

