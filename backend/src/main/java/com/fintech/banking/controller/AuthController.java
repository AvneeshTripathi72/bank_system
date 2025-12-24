package com.fintech.banking.controller;

import com.fintech.banking.entity.User;
import com.fintech.banking.service.AuthService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        User user = authService.registerUser(
            request.getUsername(), 
            request.getPassword(), 
            request.getEmail(), 
            request.getFullName()
        );
        return ResponseEntity.ok(Map.of("message", "User registered successfully", "userId", user.getId()));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        String token = authService.login(request.getUsername(), request.getPassword());
        return ResponseEntity.ok(Map.of("token", token));
    }
}

@Data
class RegisterRequest {
    private String username;
    private String password;
    private String email;
    private String fullName;
}

@Data
class LoginRequest {
    private String username;
    private String password;
}
