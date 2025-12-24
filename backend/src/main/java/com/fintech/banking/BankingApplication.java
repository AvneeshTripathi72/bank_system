package com.fintech.banking;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class BankingApplication {

    public static void main(String[] args) {
        ensureDatabaseExists();
        SpringApplication.run(BankingApplication.class, args);
    }

    private static void ensureDatabaseExists() {
        String url = "jdbc:postgresql://localhost:5432/postgres";
        String user = "postgres";
        String password = "Avanish@123";

        try (java.sql.Connection connection = java.sql.DriverManager.getConnection(url, user, password);
             java.sql.Statement statement = connection.createStatement()) {
            
            java.sql.ResultSet resultSet = statement.executeQuery("SELECT 1 FROM pg_database WHERE datname = 'banking_db'");
            if (!resultSet.next()) {
                System.out.println("Database 'banking_db' not found. Creating...");
                statement.executeUpdate("CREATE DATABASE banking_db");
                System.out.println("Database 'banking_db' created successfully.");
            } else {
                System.out.println("Database 'banking_db' already exists.");
            }
        } catch (java.sql.SQLException e) {
             System.err.println("Database check/creation failed: " + e.getMessage());
             // Proceeding; Spring Boot will fail later if DB is truly missing/critical
        }
    }

}
