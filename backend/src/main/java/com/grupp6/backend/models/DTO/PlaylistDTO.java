package com.grupp6.backend.models.DTO;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "playlists")
public class PlaylistDTO {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Long userId;
    private String name;
    @ElementCollection
    @CollectionTable(name = "listOfPlaylists")
    private List<String> trackIds;

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List getTrackIds() {
        return trackIds;
    }

    public void setTrackIds(List trackIds) {
        this.trackIds = trackIds;
    }
}