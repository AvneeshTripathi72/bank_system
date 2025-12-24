package com.fintech.banking.service;

import com.fintech.banking.entity.AuditLog;
import com.fintech.banking.repository.AuditRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuditService { // As per Master Prompt requirements

    private final AuditRepository auditRepository;

    public void logAction(String username, String action, String description) {
        AuditLog log = AuditLog.builder()
                .username(username)
                .action(action)
                .description(description)
                .build();
        auditRepository.save(log);
    }
}
