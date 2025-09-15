package com.lms.dev.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.lms.dev.entity.User;
import com.lms.dev.service.UserService;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable UUID id) {
        return userService.getUserById(id);
    }

    @GetMapping("/{id}/profile-image")
    public ResponseEntity<byte[]> getProfileImage(@PathVariable UUID id) {
        User user = userService.getUserById(id);
        if (user == null || user.getProfileImage() == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                .header("Content-Type", "image/jpeg")
                .body(user.getProfileImage());
    }

    @PostMapping("/{id}/upload-image")
    public ResponseEntity<String> uploadProfileImage(@PathVariable UUID id, @RequestParam("file") MultipartFile file) {
        try {
            userService.updateUserProfile(file, id);
            return ResponseEntity.ok("Image uploaded successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading image");
        }
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable UUID id, @RequestBody User updatedUser) {
        return userService.updateUser(id, updatedUser);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable UUID id) {
        userService.deleteUser(id);
    }

    @GetMapping("/details")
    public User getUserByEmail(@RequestParam String email) {
        return userService.getUserByEmail(email);
    }
}