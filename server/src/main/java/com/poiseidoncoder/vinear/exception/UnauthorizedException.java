package com.poiseidoncoder.vinear.exception;

import org.springframework.http.HttpStatus;

public class UnauthorizedException extends BaseException {
    public UnauthorizedException(String message) {
        super(message, "UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
    }

    public UnauthorizedException(String message, Object error) {
        super(message, "UNAUTHORIZED", HttpStatus.UNAUTHORIZED, error);
    }
}
