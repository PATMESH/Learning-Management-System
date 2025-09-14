package com.lms.dev.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuestionRequest {
    private String question;
    private String option1;
    private String option2;
    private String option3;
    private String option4;
    private String answer;
    private UUID courseId;
}
