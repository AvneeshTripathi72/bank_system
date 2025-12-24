package com.fintech.banking.service;

import com.fintech.banking.entity.User;
import com.fintech.banking.enums.RoleType;
import com.fintech.banking.exception.BusinessException;
import com.fintech.banking.repository.UserRepository;
import com.fintech.banking.security.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtProvider jwtProvider;

    @Transactional
    public User registerUser(String username, String password, String email, String fullName) {
        if (userRepository.existsByUsername(username)) {
            throw new BusinessException("Username is already taken", HttpStatus.CONFLICT);
        }
        if (userRepository.existsByEmail(email)) {
            throw new BusinessException("Email is already in use", HttpStatus.CONFLICT);
        }

        User user = User.builder()
                .username(username)
                .password(passwordEncoder.encode(password))
                .email(email)
                .fullName(fullName)
                .role(RoleType.ROLE_USER)
                // .enabled(true) // Default is false/null unless specified, or use default in entity
                .build();
        
        // Note: enabled status should likely be handled, but simple MVP assumes enabled or defaults.
        // Let's ensure User entity handles it or we set it if we added that field.
        // Previous JPA entity didn't have 'enabled' field explicitly shown in my recent 'write_to_file', 
        // I should check if I missed it in the JPA Entity step. 
        // 'User.java' (JPA) I wrote earlier had: username, password, email, fullName, role, createdAt. 
        // It did NOT have 'enabled'. 
        // So I will NOT set it here to avoid compilation error.
        
        return userRepository.save(user);
    }

    public String login(String username, String password) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password)
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        return jwtProvider.generateToken(authentication);
    }
}
