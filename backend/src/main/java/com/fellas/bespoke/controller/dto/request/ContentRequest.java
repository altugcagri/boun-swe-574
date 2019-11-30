package com.fellas.bespoke.controller.dto.request;

import lombok.*;
import org.springframework.lang.NonNull;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ContentRequest {

    @NonNull
    @Builder.Default
    private Long id = 0L;

    @NonNull
    private Long topicId;

    @NotBlank
    private String title;

    @NotBlank
    private String text;
}
