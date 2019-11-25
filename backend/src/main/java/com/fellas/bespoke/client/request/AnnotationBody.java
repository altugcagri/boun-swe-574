package com.fellas.bespoke.client.request;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnnotationBody {

    private String type;
    private String value;

}
