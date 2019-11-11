package com.fellas.bespoke.client.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

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
