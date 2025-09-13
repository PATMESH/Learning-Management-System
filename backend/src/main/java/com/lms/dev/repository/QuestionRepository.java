package com.lms.dev.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lms.dev.entity.Course;
import com.lms.dev.entity.Questions;

public interface QuestionRepository extends JpaRepository<Questions, Long> {

	List<Questions> findByCourse(Course course); 
}
