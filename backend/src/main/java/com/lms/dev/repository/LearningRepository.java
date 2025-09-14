package com.lms.dev.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lms.dev.entity.Course;
import com.lms.dev.entity.Learning;
import com.lms.dev.entity.User;

import java.util.UUID;

public interface LearningRepository extends JpaRepository<Learning, UUID> {

	Learning findByUserAndCourse(User user, Course course);
}