package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Course;
import com.example.demo.entity.Progress;
import com.example.demo.entity.User;

public interface ProgressRepository extends JpaRepository<Progress, Long> {

	Progress findByUserAndCourse(User user, Course course);
}
