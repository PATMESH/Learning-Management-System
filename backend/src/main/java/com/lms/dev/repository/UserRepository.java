package com.lms.dev.repository;

import com.lms.dev.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

import com.lms.dev.entity.User;

import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {

	User findByEmail(String email);

    boolean existsByRole(UserRole role);

	User findByEmailAndPassword(String email, String password);
}
