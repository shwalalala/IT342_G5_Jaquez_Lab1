package com.it342.g5.jaquez.lab1.backend.dto;

public class UserResponseDTO {
    private String email;
    private String username;

    public UserResponseDTO(String email, String username) {
        this.email = email;
        this.username = username;
    }

    // getters
    public String getEmail() { return email; }
    public String getUsername() { return username; }
}
