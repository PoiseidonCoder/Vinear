package com.poiseidoncoder.vinear.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Slf4j
@Component
public class ErrorLogger {
    
    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    
    public static void logError(String operation, Exception ex) {
        String timestamp = LocalDateTime.now().format(formatter);
        String stackTrace = getStackTrace(ex);
        
        log.error("=== ERROR LOG ===");
        log.error("Timestamp: {}", timestamp);
        log.error("Operation: {}", operation);
        log.error("Exception Type: {}", ex.getClass().getSimpleName());
        log.error("Message: {}", ex.getMessage());
        log.error("Stack Trace:");
        log.error(stackTrace);
        log.error("=================");
    }
    
    public static void logDatabaseError(String operation, String sql, Exception ex) {
        String timestamp = LocalDateTime.now().format(formatter);
        String stackTrace = getStackTrace(ex);
        
        log.error("=== DATABASE ERROR LOG ===");
        log.error("Timestamp: {}", timestamp);
        log.error("Operation: {}", operation);
        log.error("SQL Query: {}", sql);
        log.error("Exception Type: {}", ex.getClass().getSimpleName());
        log.error("Message: {}", ex.getMessage());
        log.error("Stack Trace:");
        log.error(stackTrace);
        log.error("=========================");
    }
    
    public static void logSecurityError(String operation, String user, String endpoint, Exception ex) {
        String timestamp = LocalDateTime.now().format(formatter);
        String stackTrace = getStackTrace(ex);
        
        log.error("=== SECURITY ERROR LOG ===");
        log.error("Timestamp: {}", timestamp);
        log.error("Operation: {}", operation);
        log.error("User: {}", user);
        log.error("Endpoint: {}", endpoint);
        log.error("Exception Type: {}", ex.getClass().getSimpleName());
        log.error("Message: {}", ex.getMessage());
        log.error("Stack Trace:");
        log.error(stackTrace);
        log.error("=========================");
    }
    
    private static String getStackTrace(Exception ex) {
        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw);
        ex.printStackTrace(pw);
        return sw.toString();
    }
}
