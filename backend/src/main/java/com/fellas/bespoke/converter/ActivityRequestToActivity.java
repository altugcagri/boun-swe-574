package com.fellas.bespoke.converter;

import com.fellas.bespoke.controller.dto.request.ActivityRequest;
import com.fellas.bespoke.persistence.model.Activity;
import org.springframework.core.convert.converter.Converter;

public class ActivityRequestToActivity implements Converter<ActivityRequest, Activity> {
    @Override
    public Activity convert(ActivityRequest source) {
        final Activity activity = Activity.builder()
                .summary(source.getSummary())
                .context(source.getContext())
                .activityType(Activity.ActivityType.valueOf(source.getType().toUpperCase()))
                .actor(source.getActor())
                .object(source.getObject())
                .published(source.getPublished())
                .build();

        if (source.getId() != 0L){
            activity.setId(source.getId());
        }

        return activity;
    }
}
