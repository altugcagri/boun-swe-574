package com.fellas.bespoke.client.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnnotationServerSearchResponse {

    private String id;
    private String type;
    private AnnotationCollection first;
    private String last;
    private Integer total;

}
