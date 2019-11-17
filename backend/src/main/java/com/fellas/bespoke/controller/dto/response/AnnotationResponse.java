package com.fellas.bespoke.controller.dto.response;

import com.fellas.bespoke.controller.dto.request.Annotation;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnnotationResponse {

    private List<Annotation> annotations;

}
