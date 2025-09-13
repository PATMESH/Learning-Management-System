package com.example.demo.entity;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.*;

@Entity
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

	public List<Questions> getQuestions() {
		return questions;
	}

	public void setQuestions(List<Questions> questions) {
		this.questions = questions;
	}

	public Long getId() {
		return course_id;
	}

	public void setId(Long id) {
		this.course_id = id;
	}

	public String getCourseName() {
		return course_name;
	}

	public void setCourseName(String courseName) {
		this.course_name = courseName;
	}

	public List<Feedback> getFeedbacks() {
		return feedbacks;
	}

	public void setFeedbacks(List<Feedback> feedbacks) {
		this.feedbacks = feedbacks;
	}

	public String getPhoto() {
		return p_link;
	}

	public void setPhoto(String photo) {
		this.p_link = photo;
	}

	public String getVideo() {
		return y_link;
	}

	public void setVideo(String video) {
		this.y_link = video;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public String getTutor() {
		return instructor;
	}

	public void setTutor(String tutor) {
		this.instructor = tutor;
	}

    
}
