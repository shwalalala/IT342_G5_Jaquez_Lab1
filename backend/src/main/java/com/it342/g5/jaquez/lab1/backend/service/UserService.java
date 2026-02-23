package com.it342.g5.jaquez.lab1.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.it342.g5.jaquez.lab1.backend.dto.UserLoginDTO;
import com.it342.g5.jaquez.lab1.backend.dto.UserRegisterDTO;
import com.it342.g5.jaquez.lab1.backend.dto.UserResponseDTO;
import com.it342.g5.jaquez.lab1.backend.entity.User;
import com.it342.g5.jaquez.lab1.backend.repository.UserRepository;
import com.it342.g5.jaquez.lab1.backend.util.JwtUtil;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    // Register
    public void registerUser(UserRegisterDTO dto) {
        // Check if email or username exists
        if(userRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new RuntimeException("Email already in use");
        }
        if(userRepository.findByUsername(dto.getUsername()).isPresent()) {
            throw new RuntimeException("Username already in use");
        }

        User user = new User();
        user.setEmail(dto.getEmail());
        user.setUsername(dto.getUsername());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));

        userRepository.save(user);
    }

    // Login
    public String loginUser(UserLoginDTO dto) {
        User user = userRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        return jwtUtil.generateToken(user.getEmail());
    }

    // Get current user
    public UserResponseDTO getCurrentUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return new UserResponseDTO(user.getEmail(), user.getUsername());
    }
}
