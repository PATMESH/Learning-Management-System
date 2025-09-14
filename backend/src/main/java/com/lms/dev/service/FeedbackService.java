package com.lms.dev.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lms.dev.dto.FeedbackRequest;
import com.lms.dev.entity.Course;
import com.lms.dev.entity.Feedback;
import com.lms.dev.repository.CourseRepository;
import com.lms.dev.repository.FeedbackRepository;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;


    @Autowired
    private CourseRepository courseRepository;

    public List<Feedback> getFeedbacksForCourse(UUID courseId) {
        Course course = courseRepository.findById(courseId).orElse(null);
        if (course != null) {
            return course.getFeedbacks();
        }
        return null;
    }

    public String submitFeedback(FeedbackRequest fr) {
        Course course = courseRepository.findById(fr.getCourse_id()).orElse(null);
        Feedback feedback = new Feedback();

        if (course != null) {
            feedback.setCourse(course);
            feedback.setComment(fr.getComment());
            feedbackRepository.save(feedback);
            return "feedback submitted successfully";
        }
        return "feedback submition failed";
    }
}

