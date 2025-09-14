package com.lms.dev.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.lms.dev.entity.User;
import com.lms.dev.repository.UserRepository;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(UUID id) {
        return userRepository.findById(id).orElse(null);
    }

    public User createUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public void updateUserProfile(MultipartFile file, UUID id) throws IOException {
        User user = getUserById(id);
        if (user == null) return;
        user.setProfileImage(file.getBytes());
        userRepository.save(user);
    }

    public User updateUser(UUID id, User updatedUser) {
        User existingUser = userRepository.findById(id).orElse(null);
        if (existingUser != null) {
            existingUser.setUsername(updatedUser.getUsername());
            existingUser.setEmail(updatedUser.getEmail());
            existingUser.setDob(updatedUser.getDob());
            existingUser.setMobileNumber(updatedUser.getMobileNumber());
            existingUser.setGender(updatedUser.getGender());
            existingUser.setLocation(updatedUser.getLocation());
            existingUser.setProfession(updatedUser.getProfession());
            existingUser.setLinkedin_url(updatedUser.getLinkedin_url());
            existingUser.setGithub_url(updatedUser.getGithub_url());
            return userRepository.save(existingUser);
        }
        return null;
    }
    
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
    public User authenticateUser(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password);
    }

    public void deleteUser(UUID id) {
        userRepository.deleteById(id);
    }
}
