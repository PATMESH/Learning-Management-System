package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.User;

public interface UserRepository extends JpaRepository<User, Long> { 

	User findByEmail(String email);

	User findByEmailAndPassword(String email, String password);
}
