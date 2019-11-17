package com.fellas.bespoke.client.response;

import lombok.*;

@Setter @Getter
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
