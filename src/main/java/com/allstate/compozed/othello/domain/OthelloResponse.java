package com.allstate.compozed.othello.domain;

import org.springframework.http.HttpStatus;

/**
 * Created by localadmin on 4/3/17.
 */
public class OthelloResponse {

    private HttpStatus statusCode;
    private String emailAddress;
    private String message;


    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public HttpStatus getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(HttpStatus statusCode) {
        this.statusCode = statusCode;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }
}
