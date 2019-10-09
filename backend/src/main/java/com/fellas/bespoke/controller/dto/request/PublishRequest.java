package com.fellas.bespoke.controller.dto.request;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PublishRequest {

    private Long topicId;

    private boolean publish;

}
