package com.fellas.bespoke.controller.dto.request;

import lombok.*;
import org.springframework.lang.NonNull;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuestionRequest {

    @NonNull
    private Long contentId;

    @NotBlank
    private String text;


}
