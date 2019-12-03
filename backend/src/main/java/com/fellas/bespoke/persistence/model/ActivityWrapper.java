package com.fellas.bespoke.persistence.model;

import com.fellas.bespoke.converter.ActivityObjectConverter;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "activities")
@Builder
public class ActivityWrapper extends DataBaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private ActivityContentType activityContentType;

    @Lob
    @Convert(converter = ActivityObjectConverter.class)
    private Activity activity;

    private Long actorId;
}
