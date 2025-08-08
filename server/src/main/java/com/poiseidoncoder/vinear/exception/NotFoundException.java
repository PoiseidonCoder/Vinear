package com.poiseidoncoder.vinear.exception;

import org.springframework.http.HttpStatus;

public class NotFoundException extends BaseException {
    public NotFoundException(String message) {
        super(message, "NOT_FOUND", HttpStatus.NOT_FOUND);
    }

    public NotFoundException(String message, Object error) {
        super(message, "NOT_FOUND", HttpStatus.NOT_FOUND, error);
    }
}
