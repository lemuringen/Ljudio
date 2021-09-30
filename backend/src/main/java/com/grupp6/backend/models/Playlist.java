package com.grupp6.backend.models;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;


public class Playlist {

    private Long id;
    private String name;
    private List<Integer> trackIds;

    public Playlist(Long id, String name, List<Integer> trackIds) {
        this.id = id;
        this.name = name;
        this.trackIds = trackIds;
    }

    public Long getId() {
        return id;
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
