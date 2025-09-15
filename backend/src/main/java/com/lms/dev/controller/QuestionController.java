package com.lms.dev.controller;

import com.lms.dev.dto.QuestionRequest;
import com.lms.dev.entity.Questions;
import com.lms.dev.service.QuestionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {

    private final QuestionService questionService;

    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<Questions> addQuestion(@RequestBody QuestionRequest request) {
        Questions question = questionService.addQuestion(request);
        return new ResponseEntity<>(question, HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Questions> updateQuestion(@PathVariable UUID id, @RequestBody QuestionRequest request) {
        Questions updated = questionService.updateQuestion(id, request);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable UUID id) {
        questionService.deleteQuestion(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<Questions>> getAllByCourse(@PathVariable UUID courseId) {
        List<Questions> questions = questionService.getAllQuestionsByCourse(courseId);
        return new ResponseEntity<>(questions, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Questions> getById(@PathVariable UUID id) {
        return questionService.getQuestionById(id)
                .map(q -> new ResponseEntity<>(q, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
