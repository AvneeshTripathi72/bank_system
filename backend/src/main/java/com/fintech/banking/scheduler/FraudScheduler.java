package com.fintech.banking.scheduler;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class FraudScheduler {

    @Scheduled(fixedRate = 60000) // Every minute
    public void scanForFraud() {
        // Placeholder Logic
        // In a real system, scan transactions for suspicious patterns
        // System.out.println("Scanning for fraud..."); 
    }
}
