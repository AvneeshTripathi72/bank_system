package com.fintech.banking.config;

import com.fintech.banking.entity.User;
import com.fintech.banking.enums.RoleType;
import com.fintech.banking.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class DataInitializer {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Bean
    public CommandLineRunner initData() {
        return args -> {
            if (!userRepository.existsByUsername("admin")) {
                User admin = User.builder()
                        .fullName("System Admin")
                        .username("admin")
                        .email("admin@fintech.com")
                        .password(passwordEncoder.encode("admin123"))
                        .role(RoleType.ROLE_ADMIN)
                        .build();

                userRepository.save(admin);
                System.out.println("Default admin user created: admin / admin123");
            }
        };
    }
}
