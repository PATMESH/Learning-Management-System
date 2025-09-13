package com.lms.dev.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lms.dev.entity.Cart;

public interface CartRepository extends JpaRepository<Cart, Long> {
}