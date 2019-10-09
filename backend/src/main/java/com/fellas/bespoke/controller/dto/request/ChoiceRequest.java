package com.fellas.bespoke.controller.dto.request;


import lombok.*;
import org.springframework.lang.NonNull;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChoiceRequest {

    @NonNull
    private Long questionId;

    @NotBlank
    private String text;

    @NotNull
    private Boolean correct;

}
