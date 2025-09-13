package com.lms.dev.entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Discussion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    private String userName;

    private String content;

    @Column(updatable = false)
    private LocalDateTime time;

    @PrePersist
    protected void onCreate() {
        this.time = LocalDateTime.now();
    }
}

