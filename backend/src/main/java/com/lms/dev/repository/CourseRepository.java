package com.lms.dev.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.lms.dev.entity.Course;


public interface CourseRepository extends JpaRepository<Course, Long> {
}