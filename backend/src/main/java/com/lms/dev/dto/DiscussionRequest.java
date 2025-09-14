package com.lms.dev.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DiscussionRequest {

    private UUID course_id;
    private String content;
    private String name;
}

