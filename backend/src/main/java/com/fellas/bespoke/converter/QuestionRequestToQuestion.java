package com.fellas.bespoke.converter;

import com.fellas.bespoke.controller.dto.request.QuestionRequest;
import com.fellas.bespoke.persistence.model.Question;
import org.springframework.core.convert.converter.Converter;

public class QuestionRequestToQuestion implements Converter<QuestionRequest, Question> {

    @Override
    public Question convert(QuestionRequest source) {
        return Question.builder()
                .text(source.getText())
                .build();
    }
}
