package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Course;
import com.example.demo.entity.Questions;

public interface QuestionRepository extends JpaRepository<Questions, Long> {

	List<Questions> findByCourse(Course course); 
}
