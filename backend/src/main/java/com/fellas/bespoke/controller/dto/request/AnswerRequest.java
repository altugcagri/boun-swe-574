package com.fellas.bespoke.controller.dto.request;


import lombok.*;
import org.springframework.lang.NonNull;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnswerRequest {

    @NonNull
    private Long questionId;

    @NonNull
    private Long choiceId;

}
