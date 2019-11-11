package com.fellas.bespoke.controller.dto.request;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnnotationRequest {

    private String annotatedText;
    private String comment;
    private String page;
    private String selector;
    private String author;
    private String date;

}
