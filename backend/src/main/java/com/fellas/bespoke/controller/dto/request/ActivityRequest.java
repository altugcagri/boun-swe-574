package com.fellas.bespoke.controller.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.lang.Nullable;

import javax.validation.constraints.NotBlank;
import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ActivityRequest {
    @Nullable
    private String context;

    @NotBlank
    private String summary;

    @NotBlank
    private String type;

    @NotBlank
    private String actor;

    @NotBlank
    private String object;

    @Nullable
    private Timestamp published;
}
