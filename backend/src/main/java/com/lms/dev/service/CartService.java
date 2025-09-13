package com.example.demo.service;


import com.example.demo.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.CartRequest;
import com.example.demo.entity.Cart;
import com.example.demo.entity.Course;
import com.example.demo.repository.CartRepository;
import com.example.demo.repository.CourseRepository;
import com.example.demo.repository.UserRepository;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CourseRepository courseRepository;

    public Cart addToCart(CartRequest cartRequest) {
        User user = userRepository.findById(cartRequest.getUserId()).orElse(null);
        Course course = courseRepository.findById(cartRequest.getCourseId()).orElse(null);

        if (user != null && course != null) {
            Cart cartItem = new Cart();
            cartItem.setUser(user);
            cartItem.setCourse(course);
            return cartRepository.save(cartItem);
        }
        return null;
    }

    public void removeFromCart(Long id) {
        cartRepository.deleteById(id);
    }
}

