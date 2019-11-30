package com.fellas.bespoke.persistence.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.NaturalId;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Set;

@Entity
@Table(name = "users")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User extends DataBaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 40)
    private String name;

    @NotBlank
    @Size(max = 15)
    @Column(unique = true)
    private String username;

    @NaturalId
    @NotBlank
    @Size(max = 40)
    @Email
    @Column(unique = true)
    private String email;

    @NotBlank
    @Size(max = 100)
    private String password;

    @JsonIgnore
    @Nullable
    @ManyToMany(mappedBy = "enrolledUsers")
    private Set<Topic> enrolledTopics;

    @JsonIgnore
    @Nullable
    @ManyToMany(cascade = CascadeType.MERGE)
    @JoinTable(name = "followed_users",
            joinColumns = @JoinColumn(name = "followerId"),
            inverseJoinColumns = @JoinColumn(name = "followedId")
    )
    private Set<User> followedUsers;

    @Nullable
    @ManyToMany(cascade = CascadeType.MERGE)
    @JoinTable(name = "followed_users",
            joinColumns = @JoinColumn(name = "followedId"),
            inverseJoinColumns = @JoinColumn(name = "followerId")
    )
    private Set<User> followerUsers;
}
