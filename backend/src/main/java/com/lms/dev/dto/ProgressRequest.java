package com.example.demo.dto;


public class ProgressRequest {

    private Long userId;
    private Long courseId;
    private float playedTime;
    private float duration;


    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    public float getPlayedTime() {
        return playedTime;
    }

    public void setPlayedTime(float playedTime) {
        this.playedTime = playedTime;
    }

    public float getDuration() {
        return duration;
    }

    public void setDuration(float duration) {
        this.duration = duration;
    }
}
