package com.fellas.bespoke.controller.dto.response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LearningStepsResponse {

    private List<QuestionResponse> questions;

    private String contentTitle;

    private Long contentId;

    private Long nextContentId;

    private String topicTitle;

    private Long topicId;

}
