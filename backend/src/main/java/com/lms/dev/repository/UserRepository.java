package com.lms.dev.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lms.dev.entity.User;

public interface UserRepository extends JpaRepository<User, Long> { 

	User findByEmail(String email);

	User findByEmailAndPassword(String email, String password);
}
