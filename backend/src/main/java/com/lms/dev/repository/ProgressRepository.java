package com.lms.dev.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lms.dev.entity.Course;
import com.lms.dev.entity.Progress;
import com.lms.dev.entity.User;

public interface ProgressRepository extends JpaRepository<Progress, Long> {

	Progress findByUserAndCourse(User user, Course course);
}
