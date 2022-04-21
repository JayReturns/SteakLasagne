package com.github.jayreturns.slserver.transaction.service;

import com.github.jayreturns.slserver.transaction.domain.Transaction;
import com.github.jayreturns.slserver.transaction.repository.TransactionRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class TransactionServiceTest {

    @Mock
    private Transaction transaction;
    @Mock
    private TransactionRepository transactionRepository;
    @InjectMocks
    private TransactionService transactionService;

    @Test
    void testGetTransactions() {
        when(transactionRepository.findAll()).thenReturn(List.of(transaction));

        transactionService.getTransactions();

        verify(transactionRepository).findAll();
    }

    @Test
    void testGetTransaction() {
        when(transactionRepository.findById(anyString())).thenReturn(Optional.of(transaction));

        transactionService.getTransaction("MyID");

        verify(transactionRepository).findById(anyString());
    }

    @Test
    void testGetTransaction_NonExistingId() {
        assertThrows(NoSuchElementException.class, () -> transactionService.getTransaction("Nope"));
    }

    @Test
    void testCreateTransaction() {
        transactionService.createTransaction(transaction);

        verify(transactionRepository).save(any());
    }

    @Test
    void testUpdateTransaction() {
        when(transaction.getId()).thenReturn(UUID.randomUUID().toString());
        when(transactionRepository.findById(anyString())).thenReturn(Optional.of(transaction));

        transactionService.updateTransaction(transaction);

        verify(transactionRepository).save(any());
    }

    @Test
    void testDeleteTransaction() {
        transactionService.deleteTransaction("MyId");

        verify(transactionRepository).deleteById(anyString());
    }
}