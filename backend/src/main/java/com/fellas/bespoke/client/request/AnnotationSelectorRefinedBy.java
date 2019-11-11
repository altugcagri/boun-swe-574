package com.fellas.bespoke.client.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnnotationSelectorRefinedBy {

    private String type;
    private String exact;
    private String prefix;
    private String suffix;

}
