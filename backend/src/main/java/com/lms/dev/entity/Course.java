package com.lms.dev.entity;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("course_id")
    private Long course_id;
    @JsonProperty("course_name")
    private String course_name;
    private int price;
    @JsonProperty("instructor")
    private String instructor;
    private String description;
    @JsonProperty("p_link")
    private String p_link;
    @JsonProperty("y_link")
    private String y_link;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Feedback> feedbacks;
    
    @OneToMany(mappedBy = "course")
    @JsonIgnore
    private List<Questions> questions;
}
