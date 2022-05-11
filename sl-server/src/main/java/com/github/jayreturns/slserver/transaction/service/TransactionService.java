package com.github.jayreturns.slserver.transaction.service;

import com.github.jayreturns.slserver.transaction.domain.Transaction;
import com.github.jayreturns.slserver.transaction.repository.TransactionRepository;
import com.github.jayreturns.slserver.user.domain.User;
import com.github.jayreturns.slserver.user.service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;

    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    /**
     * Returns the {@link com.github.jayreturns.slserver.transaction.domain.Transaction} with {@code id}
     * @param id UUID to get
     * @return Transaction with corresponding {@code id}
     */
    public Transaction getTransaction(String id) {
        return transactionRepository.findById(id).orElseThrow();
    }

    /**
     * Returns the {@link com.github.jayreturns.slserver.transaction.domain.Transaction} with {@code id}
     * @param user to get
     * @return Transaction with corresponding {@code user}
     */
    public List<Transaction> getUserTransaction(User user) {
        return transactionRepository.getAllByUser(user);
    }

    /**
     * Get all {@link Transaction}
     * @return {@link List} of all available transactions
     */
    public List<Transaction> getTransactions() {
        return transactionRepository.findAll();
    }

    /**
     * Create a new {@link Transaction}
     * @param transaction The transaction to create. UUID can be null
     * @return The create {@link Transaction}
     */
    public Transaction createTransaction(Transaction transaction) {
        transaction.setId(UUID.randomUUID().toString());

        return transactionRepository.save(transaction);
    }

    /**
     * The Transaction with {@code id} of {@code newTransaction} will be overwritten
     * @param newTransaction The new Transaction object
     * @return The updated {@link Transaction}
     */
    public Transaction updateTransaction(Transaction newTransaction) {
        Transaction transaction = transactionRepository.findById(newTransaction.getId()).orElseThrow();

        transaction.setCategory(newTransaction.getCategory());
        transaction.setDate(newTransaction.getDate());
        transaction.setNotice(newTransaction.getNotice());
        transaction.setTitle(newTransaction.getTitle());
        transaction.setValue(newTransaction.getValue());

        return transactionRepository.save(transaction);
    }

    /**
     * Delete the transaction with {@code id}
     * @param id UUID of Transaction
     */
    public void deleteTransaction(String id) {
        transactionRepository.deleteById(id);
    }

}
