package com.lms.dev.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProgressRequest {

    private UUID userId;
    private UUID courseId;
    private float playedTime;
    private float duration;
}
