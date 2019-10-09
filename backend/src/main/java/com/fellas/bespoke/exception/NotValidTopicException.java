package com.fellas.bespoke.exception;

public class NotValidTopicException extends RuntimeException {

    public NotValidTopicException(String title, String message) {

        super(String
                .format("Topic with title: '%s' is not valid Reason: '%s'", title, message));
    }
}
