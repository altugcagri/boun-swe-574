package com.fellas.bespoke.converter;

import com.fellas.bespoke.controller.dto.response.ActivityResponse;
import com.fellas.bespoke.persistence.model.Activity;
import org.springframework.core.convert.converter.Converter;

public class ActivityToActivityResponse implements Converter<Activity, ActivityResponse> {
    @Override
    public ActivityResponse convert(Activity source) {
        final String type = source.getActivityType().toString();

        return ActivityResponse.builder()
                .context(source.getContext())
                .summary(source.getSummary())
                .type(type.substring(0,1) + type.substring(1).toLowerCase())
                .actor(source.getActor())
                .object(source.getObject())
                .published(source.getPublished())
                .build();
    }
}
