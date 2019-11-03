package com.fellas.bespoke.controller.dto.response;

import lombok.*;
import org.springframework.lang.Nullable;

import javax.validation.constraints.NotBlank;
import java.io.Serializable;
import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ActivityResponse {
    private String context;
    private String summary;
    private String type;
    private String actor;
    private String object;
    private Timestamp published;
}
