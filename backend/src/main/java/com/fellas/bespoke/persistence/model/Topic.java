package com.fellas.bespoke.persistence.model;

import lombok.*;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "topics")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Topic extends UserCreatedDataBaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @NotBlank
    private String title;

    @Lob
    @NotBlank
    private String description;

    @Lob
    @NotBlank
    private String imageUrl;

    @Nullable
    private boolean published;

    @NotBlank
    private String createdByName;

    @Nullable
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "topic")
    private List<Content> contentList;

    @Nullable
    @ManyToMany(cascade = CascadeType.MERGE)
    @JoinTable(
            name = "topic_wikidata",
            joinColumns = @JoinColumn(name = "topic_id"),
            inverseJoinColumns = @JoinColumn(name = "wikidata_id"))
    private Set<WikiData> wikiDataSet;

    @Nullable
    @ManyToMany(cascade = CascadeType.MERGE)
    @JoinTable(name = "enrolled_users",
            joinColumns = @JoinColumn(name = "topic_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Set<User> enrolledUsers;

}


