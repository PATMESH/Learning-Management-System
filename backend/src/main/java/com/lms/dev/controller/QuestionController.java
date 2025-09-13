package com.lms.dev.controller;

import com.lms.dev.dto.QuestionRequest;
import com.lms.dev.entity.Questions;
import com.lms.dev.service.QuestionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {

    private final QuestionService questionService;

    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @PostMapping
    public ResponseEntity<Questions> addQuestion(@RequestBody QuestionRequest request) {
        Questions question = questionService.addQuestion(request);
        return new ResponseEntity<>(question, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Questions> updateQuestion(@PathVariable Long id, @RequestBody QuestionRequest request) {
        Questions updated = questionService.updateQuestion(id, request);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long id) {
        questionService.deleteQuestion(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<Questions>> getAllByCourse(@PathVariable Long courseId) {
        List<Questions> questions = questionService.getAllQuestionsByCourse(courseId);
        return new ResponseEntity<>(questions, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Questions> getById(@PathVariable Long id) {
        return questionService.getQuestionById(id)
                .map(q -> new ResponseEntity<>(q, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
