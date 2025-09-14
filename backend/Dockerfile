# ---------- Build stage ----------
FROM maven:3.9.9-eclipse-temurin-17 AS builder
WORKDIR /app

# Copy pom.xml and download deps
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source and build
COPY src ./src
RUN mvn clean package -DskipTests

# ---------- Runtime stage ----------
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Add a non-root user
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

# Copy only the built jar
COPY --from=builder /app/target/*.jar app.jar

# Expose port
EXPOSE 8080

# Default run command
ENTRYPOINT ["java","-jar","app.jar"]
