package com.fellas.bespoke.persistence.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "activity_streams")
public class ActivityStream {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private final String CONTENT = "https://www.w3.org/ns/activitystreams";
    private String summary;
    private ActivityStreamType type;
    private String actor;
    private String object;
    private final Instant published = Instant.now();

    @JsonProperty("@content")
    public String getCONTENT() {
        return CONTENT;
    }
}

