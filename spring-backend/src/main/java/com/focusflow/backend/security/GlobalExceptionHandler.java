package com.focusflow.backend.security;

import com.focusflow.backend.dto.ApiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.nio.file.AccessDeniedException;
import java.util.HashMap;
import java.util.Map;

/**
 * Centrally handles exceptions across all controllers.
 * Ensures we never leak stack traces to the frontend and provides
 * consistent, secure error messages.
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, Object> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        
        log.warn("Validation failed: {}", errors);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ApiResponse.withData("Validation failed", errors));
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ApiResponse> handleAccessDenied(AccessDeniedException ex) {
        log.error("Security violation: Access denied to resource");
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(ApiResponse.error("You do not have permission to access this neural sector."));
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ApiResponse> handleRuntime(RuntimeException ex) {
        log.error("Application error: {}", ex.getMessage());
        // Do not return ex.getMessage() directly if it contains sensitive internal info
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponse.error("Internal Neural System failure. Please try later."));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse> handleGeneric(Exception ex) {
        log.error("Critical System error: ", ex);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponse.error("A critical error occurred in the FocusFlow grid."));
    }
}
