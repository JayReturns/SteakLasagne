package com.github.jayreturns.slserver.transaction.service;

import com.github.jayreturns.slserver.transaction.domain.Transaction;
import com.github.jayreturns.slserver.transaction.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;


    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public Transaction getTransaction(UUID id) {
        return transactionRepository.findById(id).orElseThrow();
    }

    public List<Transaction> getTransactions() {
        return transactionRepository.findAll();
    }

    public Transaction createTransaction(Transaction transaction) {
        if (transactionRepository.existsById(transaction.getId())) {
            throw new IllegalArgumentException("Transaction with ID %s already exists!".formatted(transaction.getId()));
        }

        return transactionRepository.save(transaction);
    }

    public Transaction updateTransaction(Transaction newTransaction) {
        Transaction transaction = transactionRepository.findById(newTransaction.getId()).orElseThrow();

        transaction.setCategory(newTransaction.getCategory());
        transaction.setDate(newTransaction.getDate());
        transaction.setNotice(newTransaction.getNotice());
        transaction.setTitle(newTransaction.getTitle());
        transaction.setValue(newTransaction.getValue());

        return transactionRepository.save(transaction);
    }

    public void deleteTransaction(UUID id) {
        transactionRepository.deleteById(id);
    }

}
