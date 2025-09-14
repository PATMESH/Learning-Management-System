package com.lms.dev.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.lms.dev.entity.Course;

import java.util.UUID;


public interface CourseRepository extends JpaRepository<Course, UUID> {
}