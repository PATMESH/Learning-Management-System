package com.lms.dev.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lms.dev.entity.Course;
import com.lms.dev.entity.Progress;
import com.lms.dev.entity.User;

import java.util.UUID;

public interface ProgressRepository extends JpaRepository<Progress, UUID> {

	Progress findByUserAndCourse(User user, Course course);
}
