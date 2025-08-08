package com.poiseidoncoder.vinear.exception;

import org.springframework.http.HttpStatus;

public class BadRequestException extends BaseException {
    public BadRequestException(String message) {
        super(message, "BAD_REQUEST", HttpStatus.BAD_REQUEST);
    }

    public BadRequestException(String message, Object error) {
        super(message, "BAD_REQUEST", HttpStatus.BAD_REQUEST, error);
    }
}
