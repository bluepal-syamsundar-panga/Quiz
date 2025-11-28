# # Build stage
# FROM maven:3.9.4-eclipse-temurin-21 AS build
# WORKDIR /workspace/app
# COPY pom.xml mvnw mvnw.cmd ./
# COPY .mvn .mvn
# COPY src src
# RUN mvn -B -DskipTests package

# # Run stage
# FROM eclipse-temurin:21-jre-alpine
# WORKDIR /app
# COPY --from=build /workspace/app/target/*.jar app.jar

# EXPOSE 1805
# ENTRYPOINT ["java","-jar","/app/app.jar"]

# Build stage
FROM maven:3.9.4-eclipse-temurin-21 AS build
WORKDIR /workspace/app

# Copy Maven config and source
COPY pom.xml .
COPY src src

# Build the application
RUN mvn -B -DskipTests package

# Run stage
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /workspace/app/target/*.jar app.jar

EXPOSE 1805
ENTRYPOINT ["java","-jar","/app/app.jar"]
