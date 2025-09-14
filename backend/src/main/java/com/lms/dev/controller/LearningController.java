package com.lms.dev.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.lms.dev.dto.EnrollRequest;
import com.lms.dev.entity.Course;
import com.lms.dev.entity.Learning;
import com.lms.dev.service.LearningService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/learning")
public class LearningController {

    @Autowired
    private LearningService learningService;

    @GetMapping("/{userId}")
    public List<Course> getLearningCourses(@PathVariable UUID userId) {
        return learningService.getLearningCourses(userId);
    }
    
    @GetMapping
    public List<Learning> getEnrollments() {
        return learningService.getEnrollments();
    }

    @PostMapping
    public String enrollCourse(@RequestBody EnrollRequest enrollRequest) {
        return learningService.enrollCourse(enrollRequest);
    }

    @DeleteMapping("/{id}")
    public void unenrollCourse(@PathVariable UUID id) {
        learningService.unenrollCourse(id);
    }
}
