package com.fellas.bespoke.persistence.model;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "activities")
@Builder
public class Activity extends DataBaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private ActivityContentType activityContentType;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "activity_stream_id")
    private ActivityStream activityStream;

    private Long actor_id;
}
