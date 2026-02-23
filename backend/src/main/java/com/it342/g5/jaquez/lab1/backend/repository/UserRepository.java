package com.it342.g5.jaquez.lab1.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.it342.g5.jaquez.lab1.backend.entity.User;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String username);
}
