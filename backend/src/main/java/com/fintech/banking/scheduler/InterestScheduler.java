package com.fintech.banking.scheduler;

import com.fintech.banking.service.InterestService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class InterestScheduler {

    private final InterestService interestService;

    @Scheduled(cron = "0 0 0 * * ?") // Daily at midnight
    public void runInterestCalculation() {
        interestService.calculateInterest();
    }
}
