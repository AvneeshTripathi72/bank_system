package com.fintech.banking.service;

import org.springframework.stereotype.Service;

@Service
public class FraudService {
    // Placeholder for advanced logic as per prompt requirements
    // Real implementation would involve complex rule engines
    public boolean isSuspicious(String accountNumber, double amount) {
       return amount > 100000;
    }
}
