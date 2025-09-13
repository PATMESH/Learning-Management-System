package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Course;
import com.example.demo.entity.Learning;
import com.example.demo.entity.User;

public interface LearningRepository extends JpaRepository<Learning, Long> {

	Learning findByUserAndCourse(User user, Course course);
}