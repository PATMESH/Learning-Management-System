package com.lms.dev.entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String email;
    private String password;
    private String phno;
    private String dob;
    private String gender;
    private String location;
    private String profession;
    private String linkedin_url;
    private String github_url;
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] profileImage;


    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Cart> cartItems;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Learning> learningCourses;
}

