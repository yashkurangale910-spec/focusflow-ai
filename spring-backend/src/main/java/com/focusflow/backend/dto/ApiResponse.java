package com.focusflow.backend.dto;

import java.util.Map;

/**
 * Generic API response wrapper that mirrors the JSON shapes
 * the React frontend already expects.
 */
public class ApiResponse {

    private String status;
    private String message;
    private String error;
    private Map<String, Object> data;

    public ApiResponse() {}

    public static ApiResponse success(String message) {
        ApiResponse r = new ApiResponse();
        r.status = "ok";
        r.message = message;
        return r;
    }

    public static ApiResponse error(String error) {
        ApiResponse r = new ApiResponse();
        r.status = "error";
        r.error = error;
        return r;
    }

    public static ApiResponse withData(String message, Map<String, Object> data) {
        ApiResponse r = new ApiResponse();
        r.status = "ok";
        r.message = message;
        r.data = data;
        return r;
    }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getError() { return error; }
    public void setError(String error) { this.error = error; }

    public Map<String, Object> getData() { return data; }
    public void setData(Map<String, Object> data) { this.data = data; }
}
