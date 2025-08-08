package com.poiseidoncoder.vinear.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public abstract class BaseException extends RuntimeException {
    private final String errorCode;
    private final Object error;
    private final HttpStatus status;

    public BaseException(String message, String errorCode, HttpStatus status, Object error) {
        super(message);
        this.errorCode = errorCode;
        this.status = status;
        this.error = error;
    }

    public BaseException(String message, String errorCode, HttpStatus status) {
        super(message);
        this.errorCode = errorCode;
        this.status = status;
        this.error = null;
    }
}
