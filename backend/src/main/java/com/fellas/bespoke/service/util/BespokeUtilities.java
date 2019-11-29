package com.fellas.bespoke.service.util;

import com.fellas.bespoke.exception.CreatedByException;

public class BespokeUtilities {

    private BespokeUtilities() {
    }

    public static void checkCreatedBy(String entity, Long userId, Long createdBy) {

        if (!userId.equals(createdBy)) {
            throw new CreatedByException(entity, userId.toString(), createdBy.toString());
        }
    }

}
