package com.fintech.banking.controller;

import com.fintech.banking.entity.Account;
import com.fintech.banking.enums.AccountType;
import com.fintech.banking.service.AccountService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/accounts")
@RequiredArgsConstructor
public class AccountController {

    private final AccountService accountService;

    @PostMapping
    public ResponseEntity<Account> createAccount(@RequestBody Map<String, String> request) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        AccountType type = AccountType.valueOf(request.get("accountType").toUpperCase());
        return ResponseEntity.ok(accountService.createAccount(username, type));
    }

    @GetMapping
    public ResponseEntity<List<Account>> getMyAccounts() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return ResponseEntity.ok(accountService.getAccountsByUsername(username));
    }

    @PostMapping("/{accountNumber}/transfer")
    public ResponseEntity<?> transfer(@PathVariable String accountNumber, @RequestBody TransferRequest request) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        accountService.transfer(accountNumber, request.getTargetAccountNumber(), username, request.getAmount());
        return ResponseEntity.ok(Map.of("message", "Transfer successful"));
    }
    
    @PostMapping("/{accountNumber}/deposit")
    public ResponseEntity<?> deposit(@PathVariable String accountNumber, @RequestBody AmountRequest request) {
         accountService.deposit(accountNumber, request.getAmount());
         return ResponseEntity.ok(Map.of("message", "Deposit successful"));
    }
    
    @PostMapping("/{accountNumber}/withdraw")
    public ResponseEntity<?> withdraw(@PathVariable String accountNumber, @RequestBody AmountRequest request) {
         String username = SecurityContextHolder.getContext().getAuthentication().getName();
         accountService.withdraw(accountNumber, username, request.getAmount());
         return ResponseEntity.ok(Map.of("message", "Withdrawal successful"));
    }
}

@Data
class TransferRequest {
    private String targetAccountNumber;
    private BigDecimal amount;
}

@Data
class AmountRequest {
    private BigDecimal amount;
}
