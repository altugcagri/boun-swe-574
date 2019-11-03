package com.fellas.bespoke.persistence.model;

import lombok.*;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.sql.Timestamp;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "activities")
public class Activity extends DataBaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Nullable
    private String context;

    @NotBlank
    private String summary;

    @Enumerated(EnumType.STRING)
    private ActivityType activityType;

    @NotBlank
    private String actor;

    @NotBlank
    private String object;

    @Nullable
    private Timestamp published;

    public enum ActivityType {
        CREATE,
        ADD,
        JOIN,
        FOLLOW,
        UPDATE;
    }
}
