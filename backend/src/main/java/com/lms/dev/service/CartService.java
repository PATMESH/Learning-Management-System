package com.lms.dev.service;


import com.lms.dev.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lms.dev.dto.CartRequest;
import com.lms.dev.entity.Cart;
import com.lms.dev.entity.Course;
import com.lms.dev.repository.CartRepository;
import com.lms.dev.repository.CourseRepository;
import com.lms.dev.repository.UserRepository;

@RequiredArgsConstructor
@Service
public class CartService {

    private final CartRepository cartRepository;

    private final UserRepository userRepository;

    private final CourseRepository courseRepository;

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

