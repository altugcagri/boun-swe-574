package com.fellas.bespoke.persistence.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.time.Instant;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Activity {

    @JsonProperty("@content")
    private final String CONTENT = "https://www.w3.org/ns/activitystreams";
    private String summary;
    private ActivityStreamType type;
    private String actor;
    private String object;
    private Instant published ;

    @JsonProperty("@content")
    public String getCONTENT() {
        return CONTENT;
    }
}

