package com.fintech.banking.service;

import com.fintech.banking.entity.Account;
import com.fintech.banking.entity.Transaction;
import com.fintech.banking.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final AccountService accountService;

    public List<Transaction> getTransactionHistory(String accountNumber, String username) {
        Account account = accountService.getAccountByNumber(accountNumber);
        
        if(!account.getUser().getUsername().equals(username)){
             throw new RuntimeException("Unauthorized");
        }
        
        return transactionRepository.findBySourceAccountOrTargetAccountOrderByTimestampDesc(account, account);
    }
}
