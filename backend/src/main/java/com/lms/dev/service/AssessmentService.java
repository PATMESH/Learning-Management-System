package com.example.demo.service;

import java.util.List;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.example.demo.entity.Assessment;
import com.example.demo.entity.Course;
import com.example.demo.entity.Progress;
import com.example.demo.entity.User;
import com.example.demo.repository.AssessmentRepository;
import com.example.demo.repository.ProgressRepository;


@Service
@RequiredArgsConstructor
@Slf4j
public class AssessmentService {

    private final AssessmentRepository assessmentRepository;
    
    public List<Assessment> getAssessmentsByUserAndCourse(User user, Course course) {
        return assessmentRepository.findByUserAndCourse(user, course);
    }
    
    public ResponseEntity<List<Assessment>> getAssessmentByUser(User user){
    	return ResponseEntity.status(HttpStatus.CREATED).body(assessmentRepository.findByUser(user));
    }

    public Assessment createAssessment(Assessment assessment) {
        return assessmentRepository.save(assessment);
    }

    public void addMarks(Assessment assessment, int marks) {
        assessment.setMarks(marks);
    }
    public ResponseEntity<Assessment> saveAssessment(User user, Course course, Assessment assessment) {
        List<Assessment> existingAssessments = getAssessmentsByUserAndCourse(user, course);
        if (!existingAssessments.isEmpty()) {
            Assessment existingAssessment = existingAssessments.get(0);
            int newMarks = assessment.getMarks();

            if (newMarks > existingAssessment.getMarks()) {
                addMarks(existingAssessment, newMarks);
                Assessment updatedAssessment = createAssessment(existingAssessment);
                return ResponseEntity.status(HttpStatus.CREATED).body(updatedAssessment);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }
        } else {
            assessment.setUser(user);
            assessment.setCourse(course);
            Assessment savedAssessment = createAssessment(assessment);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedAssessment);
        }
    }
}
