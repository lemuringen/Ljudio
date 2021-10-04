package com.grupp6.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class User {

    private Long id;
    private String email;
    private String password;
    private String firstName;
    private String lastName;

    @JsonIgnore
    public String getPassword() {
        return password;
    }
    /**
     * Put @JsonIgnore on the password getter to prevent
     * password leaking to frontend
     * and @JsonProperty on the setter to enable login
     */
    @JsonProperty
    public void setPassword(String password) {
        this.password = password;
    }
}
