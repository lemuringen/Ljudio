package com.grupp6.backend.models.DTO;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "users")
public class UserDTO {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String email;
    private String password;
    private String firstName;
    private String lastName;


    public void setEmail(String email) {
        this.email = email;
    }
    @JsonProperty
    public String getPassword() {
        return password;
    }
    /**
     * Put @JsonIgnore on the password getter to prevent
     * password leaking to frontend
     * and @JsonProperty on the setter to enable login
     */
    @JsonIgnore
    public void setPassword(String password) {
        this.password = password;
    }
}
