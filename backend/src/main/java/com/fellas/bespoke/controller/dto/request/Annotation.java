package com.fellas.bespoke.controller.dto.request;

import lombok.*;

import javax.validation.constraints.NotEmpty;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Annotation {

    private String annotatedText;

    @NotEmpty
    private String comment;

    @NotEmpty
    private String page;

    @NotEmpty
    private String selector;

    @NotEmpty
    private String author;

    private String date;

}
