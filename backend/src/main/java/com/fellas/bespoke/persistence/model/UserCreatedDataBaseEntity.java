package com.fellas.bespoke.persistence.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;

@MappedSuperclass
@JsonIgnoreProperties(
        value = {"createdBy"},
        allowGetters = true
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserCreatedDataBaseEntity extends DataBaseEntity {

    @CreatedBy
    @Column(updatable = false)
    private Long createdBy;

}
