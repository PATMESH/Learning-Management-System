package com.example.demo.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Course;
import com.example.demo.entity.Discussion;

public interface DiscussionRepository extends JpaRepository<Discussion, Long> {

    List<Discussion> findByCourse(Course course);
}
