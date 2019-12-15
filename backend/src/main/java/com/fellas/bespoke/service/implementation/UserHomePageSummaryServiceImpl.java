package com.fellas.bespoke.service.implementation;

import com.fellas.bespoke.controller.dto.response.TopicResponse;
import com.fellas.bespoke.exception.ResourceNotFoundException;
import com.fellas.bespoke.persistence.TopicRepository;
import com.fellas.bespoke.persistence.UserRepository;
import com.fellas.bespoke.persistence.model.Activity;
import com.fellas.bespoke.persistence.model.Topic;
import com.fellas.bespoke.persistence.model.User;
import com.fellas.bespoke.persistence.model.UserHomePageSummary;
import com.fellas.bespoke.security.UserPrincipal;
import com.fellas.bespoke.service.ActivityService;
import com.fellas.bespoke.service.UserHomePageSummaryService;
import org.springframework.core.convert.support.ConfigurableConversionService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserHomePageSummaryServiceImpl implements UserHomePageSummaryService{
    private static final String USER = "User";

    private TopicRepository topicRepository;
    private UserRepository userRepository;
    private ActivityService activityService;
    private ConfigurableConversionService bespokeConversionService;

    public UserHomePageSummaryServiceImpl(TopicRepository topicRepository, UserRepository userRepository, ActivityService activityService, ConfigurableConversionService bespokeConversionService) {
        this.topicRepository = topicRepository;
        this.userRepository = userRepository;
        this.activityService = activityService;
        this.bespokeConversionService = bespokeConversionService;
    }

    @Override
    public UserHomePageSummary getUserHomePageSummary(UserPrincipal currentUser) {
        User user = userRepository.findById(currentUser.getId()).orElseThrow(() -> new ResourceNotFoundException(USER, "id", currentUser.getId().toString()));
        List<Topic> lastEnrolledTopics = topicRepository.findTopicByEnrolledUsersContainsAndPublished(user, true);
        Collections.reverse(lastEnrolledTopics);
        List<Topic> lastAddedTopics = topicRepository.findByPublished(true);
        lastAddedTopics.removeIf(t -> t.getCreatedBy().equals(user.getId()));
        List<Topic> filteredLastAddedTopics = lastAddedTopics.stream()
                .filter(topic -> !lastEnrolledTopics.contains(topic))
                .collect(Collectors.toList());
        Collections.reverse(lastAddedTopics);

        List<Topic> recommendedTopics = new ArrayList<>();
        List<Activity> activities = activityService.getActivityStream(currentUser);
        Collections.reverse(activities);

        UserHomePageSummary userHomePageSummary = UserHomePageSummary.builder()
                .activities(activities)
                .build();

        if (lastEnrolledTopics.size() > 0){
            userHomePageSummary.setLastEnrolledTopic(bespokeConversionService.convert(lastEnrolledTopics.get(0), TopicResponse.class));
        }

        if (lastAddedTopics.size() > 0){
            List<TopicResponse> topicResponses = filteredLastAddedTopics.stream().map(topic -> bespokeConversionService.convert(topic, TopicResponse.class)).collect(Collectors.toList());
            if (topicResponses.size() > 3){
                userHomePageSummary.setLastAddedTopics(topicResponses.subList(0,3));
            }
            userHomePageSummary.setLastAddedTopics(topicResponses);
        }

        if (recommendedTopics.size() > 0){
            List<TopicResponse> topicResponses = recommendedTopics.stream().map(topic -> bespokeConversionService.convert(topic, TopicResponse.class)).collect(Collectors.toList());
            if (topicResponses.size() > 3){
                userHomePageSummary.setRecommendedTopics(topicResponses.subList(0, 3));
            }
            userHomePageSummary.setRecommendedTopics(topicResponses);
        }

        return userHomePageSummary;
    }

    public List<Topic> getRecommendedTopics(){
        List<Topic> recommendedTopics = new ArrayList<>();
        return null;
    }
}
