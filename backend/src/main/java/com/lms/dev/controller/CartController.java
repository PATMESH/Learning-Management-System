package com.lms.dev.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.lms.dev.dto.CartRequest;
import com.lms.dev.entity.Cart;
import com.lms.dev.service.CartService;

@RestController
@RequestMapping("/api/carts")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping
    public Cart addToCart(@RequestBody CartRequest cartRequest) {
        return cartService.addToCart(cartRequest);
    }

    @DeleteMapping("/{id}")
    public void removeFromCart(@PathVariable Long id) {
        cartService.removeFromCart(id);
    }
}