package com.fellas.bespoke.persistence.model;

import com.fellas.bespoke.controller.dto.response.TopicResponse;
import lombok.*;

import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserHomePageSummary implements Serializable {
    private TopicResponse lastEnrolledTopic;
    private List<TopicResponse> lastAddedTopics;
    private List<TopicResponse> recommendedTopics;
    private List<Activity> activities;
}
