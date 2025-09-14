package com.lms.dev.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lms.dev.entity.Assessment;
import com.lms.dev.entity.Course;
import com.lms.dev.entity.User;

public interface AssessmentRepository extends JpaRepository<Assessment, UUID> {

    List<Assessment> findByUserAndCourse(User user, Course course);

	List<Assessment> findByUser(User user);
}
