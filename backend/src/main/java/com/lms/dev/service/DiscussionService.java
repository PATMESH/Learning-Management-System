package com.example.demo.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.entity.Course;
import com.example.demo.entity.Discussion;
import com.example.demo.repository.DiscussionRepository;


@Service
public class DiscussionService {

    @Autowired
    private DiscussionRepository discussionRepository;

    public List<Discussion> getDiscussionsCourse(Course course) {
        return discussionRepository.findByCourse(course);
    }
    public Discussion createDiscussion(Discussion discussion) {
        return discussionRepository.save(discussion);
    }
}
