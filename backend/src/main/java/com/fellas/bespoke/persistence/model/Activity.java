package com.fellas.bespoke.persistence.model;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "activity_streams")
@Builder
public class Activity extends DataBaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private ActivityContentType activityContentType;

    @Lob
    private String activityStream;

    private Long actor_id;

}
