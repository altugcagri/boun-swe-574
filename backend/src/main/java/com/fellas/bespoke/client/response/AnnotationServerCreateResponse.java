package com.fellas.bespoke.client.response;

import com.fellas.bespoke.client.request.AnnotationBody;
import com.fellas.bespoke.client.request.AnnotationTarget;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnnotationServerCreateResponse {

    private String id;
    private String type;
    private String creator;
    private String created;
    private AnnotationBody body;
    private AnnotationTarget target;

}
