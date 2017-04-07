package com.allstate.compozed.othello.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Created by Pimp Diggler on 4/6/2017.
 */
@ResponseStatus(value = HttpStatus.CONFLICT)
public class RegisteredUserException extends Exception {

    public RegisteredUserException(String message) {
        super(message);
    }
}
