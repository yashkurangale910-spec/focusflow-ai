package com.focusflow.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Thrown when rate limits or brute force protection are triggered.
 */
@ResponseStatus(HttpStatus.TOO_MANY_REQUESTS)
public class ThrottledException extends RuntimeException {
    public ThrottledException(String message) {
        super(message);
    }
}
