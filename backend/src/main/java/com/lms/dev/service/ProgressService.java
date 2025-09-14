package com.lms.dev.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.lms.dev.dto.ProgressRequest;
import com.lms.dev.entity.Course;
import com.lms.dev.entity.Progress;
import com.lms.dev.entity.User;
import com.lms.dev.repository.CourseRepository;
import com.lms.dev.repository.ProgressRepository;
import com.lms.dev.repository.UserRepository;

import java.util.UUID;

@RequiredArgsConstructor
@Service
public class ProgressService {

    private final ProgressRepository progressRepository;

    private final UserRepository userRepository;

    private final CourseRepository courseRepository;

    public ResponseEntity<String> updateProgress(ProgressRequest request) {
        UUID userId = request.getUserId();
        UUID courseId = request.getCourseId();
        float playedTime = request.getPlayedTime();
        float duration = request.getDuration();

        User user = userRepository.findById(userId).orElse(null);
        Course course = courseRepository.findById(courseId).orElse(null);

        if (user != null && course != null) {
            Progress progress = progressRepository.findByUserAndCourse(user, course);
            if (progress != null && (progress.getPlayedTime() == 0 || progress.getPlayedTime()<= playedTime)) {
                progress.setPlayedTime(playedTime);
                progress.setDuration(duration);
                progressRepository.save(progress);
                return ResponseEntity.ok("success");
            } else {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Invalid playedTime");
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User or course not found");
    }

	public float getProgress(UUID userId, UUID courseId) {
		User user = userRepository.findById(userId).orElse(null);
        Course course = courseRepository.findById(courseId).orElse(null);

        if (user != null && course != null) {
         Progress progress = progressRepository.findByUserAndCourse(user, course);
         return progress.getPlayedTime();
        }
		return 0; 
	}

	public ResponseEntity<String> updateDuration(ProgressRequest request) {
        UUID userId = request.getUserId();
        UUID courseId = request.getCourseId();
        float newDuration = request.getDuration();

        User user = userRepository.findById(userId).orElse(null);
        Course course = courseRepository.findById(courseId).orElse(null);

        if (user != null && course != null) {
            Progress progress = progressRepository.findByUserAndCourse(user, course);

            if (progress != null) {
                progress.setDuration(newDuration);
                progressRepository.save(progress);

                return ResponseEntity.ok("Duration updated successfully");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Progress not found for the given user and course");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User or course not found");
        }
    }

    
}

