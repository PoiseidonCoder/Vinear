package com.poiseidoncoder.vinear.exception;

import org.springframework.http.HttpStatus;

public class ConflictException extends BaseException {
    public ConflictException(String message) {
        super(message, "CONFLICT", HttpStatus.CONFLICT);
    }

    public ConflictException(String message, Object error) {
        super(message, "CONFLICT", HttpStatus.CONFLICT, error);
    }
}
