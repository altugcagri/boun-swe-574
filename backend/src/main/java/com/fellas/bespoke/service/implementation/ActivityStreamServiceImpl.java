package com.fellas.bespoke.service.implementation;

import com.fellas.bespoke.persistence.ActivityStreamRepository;
import com.fellas.bespoke.persistence.model.ActivityStream;
import com.fellas.bespoke.service.ActivityStreamService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActivityStreamServiceImpl implements ActivityStreamService {
    private ActivityStreamRepository activityStreamRepository;

    public ActivityStreamServiceImpl(ActivityStreamRepository activityStreamRepository) {
        this.activityStreamRepository = activityStreamRepository;
    }

    @Override
    public List<ActivityStream> getAllActivityStreams() {
        return activityStreamRepository.findAll();
    }

    @Override
    public ActivityStream createActivityStream(ActivityStream activityStream) {
        return activityStreamRepository.save(activityStream);
    }
}
