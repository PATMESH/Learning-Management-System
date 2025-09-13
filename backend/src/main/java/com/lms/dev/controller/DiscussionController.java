package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.DiscussionRequest;
import com.example.demo.entity.Course;
import com.example.demo.entity.Discussion;
import com.example.demo.entity.User;
import com.example.demo.service.CourseService;
import com.example.demo.service.DiscussionService;
import com.example.demo.service.UserService;

@RestController
@RequestMapping("/api/discussions")
public class DiscussionController {

    @Autowired
    private DiscussionService discussionService;
    
    @Autowired
    private CourseService courseService;

    @GetMapping("/{courseId}")
    public ResponseEntity<List<Discussion>> getDiscussionsAndCourse(
            @PathVariable Long courseId
    ) {
        Course course = courseService.getCourseById(courseId);
        List<Discussion> discussions = discussionService.getDiscussionsCourse(course);
        return ResponseEntity.ok(discussions);
    }
    @PostMapping("/addMessage")
    public ResponseEntity<Discussion> createDiscussion(
            @RequestBody DiscussionRequest discussionRequest
    ) {
    	System.out.println(discussionRequest.getCourse_id() +" "+discussionRequest.getName()+" "+discussionRequest.getContent());
        Course course = courseService.getCourseById(discussionRequest.getCourse_id());
        Discussion discussion = new Discussion();
        discussion.setuName(discussionRequest.getName());
        discussion.setCourse(course);
        discussion.setContent(discussionRequest.getContent());
        Discussion createdDiscussion = discussionService.createDiscussion(discussion);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdDiscussion);
    }
}
