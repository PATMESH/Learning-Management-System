package com.lms.dev.service;
import java.util.List;
import java.util.UUID;

import com.lms.dev.dto.DiscussionRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.lms.dev.entity.Course;
import com.lms.dev.entity.Discussion;
import com.lms.dev.repository.DiscussionRepository;

@RequiredArgsConstructor
@Service
public class DiscussionService {

    private final DiscussionRepository discussionRepository;
    private final CourseService courseService;

    public List<Discussion> getDiscussionsCourse(UUID courseId) {
        Course course = courseService.getCourseById(courseId);
        return discussionRepository.findByCourse(course);
    }
    public Discussion createDiscussion( DiscussionRequest discussionRequest) {
        Course course = courseService.getCourseById(discussionRequest.getCourse_id());
        Discussion discussion = new Discussion();
        discussion.setUserName(discussionRequest.getName());
        discussion.setCourse(course);
        discussion.setContent(discussionRequest.getContent());
        return discussionRepository.save(discussion);
    }
}
