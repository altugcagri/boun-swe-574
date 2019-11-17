package com.fellas.bespoke.client.response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnnotationCollection {

    private String type;
    private List<AnnotationServerCreateResponse> items;
    private String partOf;
    private Integer startIndex;

}
