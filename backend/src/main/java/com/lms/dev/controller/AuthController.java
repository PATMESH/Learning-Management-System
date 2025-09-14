package com.lms.dev.controller;

import com.lms.dev.dto.ApiResponse;
import com.lms.dev.dto.JwtResponseDTO;
import com.lms.dev.dto.LoginRequestDTO;
import com.lms.dev.entity.User;
import com.lms.dev.security.UserPrincipal;
import com.lms.dev.security.util.JwtUtils;
import com.lms.dev.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final UserService authService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<JwtResponseDTO>> login(@Valid @RequestBody LoginRequestDTO loginRequest) {
        log.info("Login attempt for email: {}", loginRequest.getEmail());

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        JwtResponseDTO jwtResponse = JwtResponseDTO.builder()
                .token(jwt)
                .type("Bearer")
                .id(userPrincipal.getId())
                .email(userPrincipal.getEmail())
                .name(userPrincipal.getName())
                .role(userPrincipal.getAuthorities().iterator().next().getAuthority())
                .build();

        log.info("User logged in successfully: {}", loginRequest.getEmail());
        return ResponseEntity.ok(new ApiResponse<>("Login successful", jwtResponse));
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<User>> register(@Valid @RequestBody User signUpRequest) {
        log.info("Registration attempt for email: {}", signUpRequest.getEmail());

        User user = authService.createUser(signUpRequest);

        log.info("User registered successfully: {}", signUpRequest.getEmail());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse<>("User registered successfully", user));
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout() {
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok(new ApiResponse<>("Logout successful", null));
    }
}