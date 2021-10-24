package com.grupp6.backend.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Playlist {

    private Long id;
    private Long userId;
    private String name;
    private List<String> trackIds;
}
