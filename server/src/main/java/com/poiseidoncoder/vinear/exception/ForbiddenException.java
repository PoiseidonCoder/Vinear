package com.poiseidoncoder.vinear.exception;

import org.springframework.http.HttpStatus;

public class ForbiddenException extends BaseException {
    public ForbiddenException(String message) {
        super(message, "FORBIDDEN", HttpStatus.FORBIDDEN);
    }

    public ForbiddenException(String message, Object error) {
        super(message, "FORBIDDEN", HttpStatus.FORBIDDEN, error);
    }
}
