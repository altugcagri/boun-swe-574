package com.fellas.bespoke.client.request;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnnotationSelector {

    private String type;
    private String value;
    private AnnotationSelectorRefinedBy refinedBy;

}
