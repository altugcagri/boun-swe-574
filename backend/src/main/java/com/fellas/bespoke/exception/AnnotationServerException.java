package com.fellas.bespoke.exception;


public class AnnotationServerException extends RuntimeException {

    public AnnotationServerException(String message) {

        super(String
                .format("Annotation Server Exception: '%s'", message));
    }

}
