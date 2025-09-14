package com.lms.dev.repository;
import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lms.dev.entity.Course;
import com.lms.dev.entity.Discussion;

public interface DiscussionRepository extends JpaRepository<Discussion, UUID> {

    List<Discussion> findByCourse(Course course);
}
