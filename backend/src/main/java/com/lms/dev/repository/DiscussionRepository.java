package com.lms.dev.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lms.dev.entity.Course;
import com.lms.dev.entity.Discussion;

public interface DiscussionRepository extends JpaRepository<Discussion, Long> {

    List<Discussion> findByCourse(Course course);
}
