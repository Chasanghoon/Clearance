package com.ssafy.cleanrance.domain.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
@RestController
public class SignUpExceptionHandler {
    @ExceptionHandler(value = Exception.class)
    public ResponseEntity<?> handlerException(Exception e){
        return ResponseEntity.status(500).body(e.getMessage());
    }
}
