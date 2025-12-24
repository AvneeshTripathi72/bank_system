package com.fintech.banking.service;

import com.fintech.banking.entity.Account;
import com.fintech.banking.entity.Transaction;
import com.fintech.banking.entity.User;
import com.fintech.banking.enums.AccountType;
import com.fintech.banking.enums.TransactionType;
import com.fintech.banking.exception.BusinessException;
import com.fintech.banking.repository.AccountRepository;
import com.fintech.banking.repository.TransactionRepository;
import com.fintech.banking.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.security.SecureRandom;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;
    private final UserRepository userRepository;
    private final TransactionRepository transactionRepository;
    private final AuditService auditService;

    @Transactional
    public Account createAccount(String username, AccountType accountType) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new BusinessException("User not found", HttpStatus.NOT_FOUND));

        String accountNumber = generateAccountNumber();
        while (accountRepository.existsByAccountNumber(accountNumber)) {
            accountNumber = generateAccountNumber();
        }

        Account account = Account.builder()
                .accountNumber(accountNumber)
                .user(user)
                .accountType(accountType)
                .balance(BigDecimal.ZERO)
                .build();

        auditService.logAction(username, "CREATE_ACCOUNT", "Created account: " + accountNumber);
        return accountRepository.save(account);
    }

    public Account getAccountByNumber(String accountNumber) {
        return accountRepository.findByAccountNumber(accountNumber)
                .orElseThrow(() -> new BusinessException("Account not found", HttpStatus.NOT_FOUND));
    }
    
    public List<Account> getAccountsByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new BusinessException("User not found", HttpStatus.NOT_FOUND));
        return accountRepository.findByUserId(user.getId());
    }

    @Transactional
    public void deposit(String accountNumber, BigDecimal amount) {
        Account account = getAccountByNumber(accountNumber);
        
        account.setBalance(account.getBalance().add(amount));
        accountRepository.save(account);

        Transaction transaction = Transaction.builder()
                .targetAccount(account)
                .amount(amount)
                .transactionType(TransactionType.DEPOSIT)
                .status("SUCCESS")
                .description("Deposit to " + accountNumber)
                .build();
        transactionRepository.save(transaction);
        
        auditService.logAction(account.getUser().getUsername(), "DEPOSIT", "Deposited " + amount + " to " + accountNumber);
    }

    @Transactional
    public void withdraw(String accountNumber, String username, BigDecimal amount) {
        Account account = getAccountByNumber(accountNumber);
        
        if (!account.getUser().getUsername().equals(username)) {
            throw new BusinessException("Unauthorized access", HttpStatus.FORBIDDEN);
        }
        if (account.getBalance().compareTo(amount) < 0) {
            throw new BusinessException("Insufficient balance", HttpStatus.BAD_REQUEST);
        }

        account.setBalance(account.getBalance().subtract(amount));
        accountRepository.save(account);

        Transaction transaction = Transaction.builder()
                .sourceAccount(account)
                .amount(amount)
                .transactionType(TransactionType.WITHDRAWAL)
                .status("SUCCESS")
                .description("Withdrawal from " + accountNumber)
                .build();
        transactionRepository.save(transaction);

        auditService.logAction(username, "WITHDRAW", "Withdrew " + amount + " from " + accountNumber);
    }

    @Transactional
    public void transfer(String sourceAccountNumber, String targetAccountNumber, String username, BigDecimal amount) {
        if (sourceAccountNumber.equals(targetAccountNumber)) {
            throw new BusinessException("Cannot transfer to same account", HttpStatus.BAD_REQUEST);
        }

        Account sourceAccount = getAccountByNumber(sourceAccountNumber);
        Account targetAccount = getAccountByNumber(targetAccountNumber);

        if (!sourceAccount.getUser().getUsername().equals(username)) {
             throw new BusinessException("Unauthorized access to source account", HttpStatus.FORBIDDEN);
        }
        if (sourceAccount.getBalance().compareTo(amount) < 0) {
            throw new BusinessException("Insufficient balance", HttpStatus.BAD_REQUEST);
        }

        sourceAccount.setBalance(sourceAccount.getBalance().subtract(amount));
        targetAccount.setBalance(targetAccount.getBalance().add(amount));

        accountRepository.save(sourceAccount);
        accountRepository.save(targetAccount);

        Transaction transaction = Transaction.builder()
                .sourceAccount(sourceAccount)
                .targetAccount(targetAccount)
                .amount(amount)
                .transactionType(TransactionType.TRANSFER)
                .status("SUCCESS")
                .description("Transfer from " + sourceAccountNumber + " to " + targetAccountNumber)
                .build();
        transactionRepository.save(transaction);
        
        auditService.logAction(username, "TRANSFER", "Transferred " + amount + " from " + sourceAccountNumber + " to " + targetAccountNumber);
    }

    private String generateAccountNumber() {
        SecureRandom random = new SecureRandom();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 10; i++) {
            sb.append(random.nextInt(10));
        }
        return sb.toString();
    }
}
