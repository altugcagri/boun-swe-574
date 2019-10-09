package com.fellas.bespoke.controller.dto.response;

import com.fellas.bespoke.persistence.model.Choice;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuestionResponse {

    private Long id;

    private String text;

    private List<Choice> choiceList;

    private Choice userAnswer;

}
