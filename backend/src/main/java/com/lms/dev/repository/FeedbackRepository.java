package com.lms.dev.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lms.dev.entity.Feedback;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
}
