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
public class ActivityStream extends DataBaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private ActivityContent activityContent;

    @Lob
    private String activity;

    private Long actor_id;

}
