package com.poiseidoncoder.vinear.exception;

import org.springframework.http.HttpStatus;

public class DatabaseException extends BaseException {
    
    public DatabaseException(String message) {
        super(message, "DATABASE_ERROR", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
    public DatabaseException(String message, String errorCode) {
        super(message, errorCode, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
    public DatabaseException(String message, String errorCode, String details) {
        super(message, errorCode, HttpStatus.INTERNAL_SERVER_ERROR, details);
    }
    
    public static DatabaseException connectionFailed(String details) {
        return new DatabaseException("Database connection failed", "DB_CONNECTION_ERROR", details);
    }
    
    public static DatabaseException queryFailed(String details) {
        return new DatabaseException("Database query failed", "DB_QUERY_ERROR", details);
    }
    
    public static DatabaseException transactionFailed(String details) {
        return new DatabaseException("Database transaction failed", "DB_TRANSACTION_ERROR", details);
    }
}
