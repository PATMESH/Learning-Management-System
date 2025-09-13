package com.example.demo.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Course;


public interface CourseRepository extends JpaRepository<Course, Long> {
}