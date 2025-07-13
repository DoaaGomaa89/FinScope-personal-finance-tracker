# Stage 1: Build Spring Boot app
FROM maven:3.9.4-eclipse-temurin-17 as builder
WORKDIR /app
COPY pom.xml mvnw .mvn/ ./
COPY src ./src
RUN chmod +x mvnw && ./mvnw clean package -DskipTests

# Stage 2: Run Spring Boot app
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
