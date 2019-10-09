package com.fellas.bespoke.persistence.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "choices")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Choice extends UserCreatedDataBaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @NotBlank
    private String text;

    @NotNull
    private Boolean correct;

    @JsonIgnore
    @ManyToOne
    private Question question;

}
