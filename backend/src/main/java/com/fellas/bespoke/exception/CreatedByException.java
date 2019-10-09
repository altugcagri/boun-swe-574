package com.fellas.bespoke.exception;

public class CreatedByException extends RuntimeException {

    public CreatedByException(String entryType, String entryId, String userId) {

        super(String
                .format("'%s' Entry with id: '%s' cannot be edited by this User: '%s'", entryType, entryId, userId));
    }
}
