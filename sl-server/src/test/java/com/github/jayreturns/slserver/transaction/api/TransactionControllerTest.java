package com.github.jayreturns.slserver.transaction.api;

import com.github.jayreturns.slserver.transaction.domain.Transaction;
import com.github.jayreturns.slserver.transaction.domain.TransactionFactory;
import com.github.jayreturns.slserver.transaction.service.TransactionService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class TransactionControllerTest {

    @Mock
    private TransactionService transactionService;
    @Mock
    private TransactionData transactionData;
    @Mock
    private TransactionFactory transactionFactory;
    @Mock
    private TransactionDataFactory transactionDataFactory;
    @Mock
    private Transaction transaction;

    @InjectMocks
    private TransactionController transactionController;

    @Test
    void testGetTransactions() {
        transactionController.getTransactions();

        verify(transactionService).getTransactions();
        verify(transactionDataFactory).from(anyList());
    }

    @Test
    void testGetTransaction() {
        when(transactionService.getTransaction(anyString())).thenReturn(transaction);

        transactionController.getTransaction("UUID");

        verify(transactionService).getTransaction(anyString());
        verify(transactionDataFactory).from(any(Transaction.class));
    }

    @Test
    void testCreateTransaction() {
        when(transactionFactory.from(any(TransactionData.class))).thenReturn(transaction);
        when(transactionService.createTransaction(any(Transaction.class))).thenReturn(transaction);

        transactionController.createTransaction(transactionData);

        verify(transactionService).createTransaction(any());
        verify(transactionFactory).from(any());
        verify(transactionDataFactory).from(any(Transaction.class));
    }

    @Test
    void testUpdateTransaction() {
        when(transactionFactory.from(any(TransactionData.class))).thenReturn(transaction);
        when(transactionService.updateTransaction(any(Transaction.class))).thenReturn(transaction);

        transactionController.updateTransaction(transactionData);

        verify(transactionService).updateTransaction(any());
        verify(transactionFactory).from(any());
        verify(transactionDataFactory).from(any(Transaction.class));
    }

    @Test
    void testDeleteTransaction() {
        transactionController.deleteTransaction("Insert UUID here");

        verify(transactionService).deleteTransaction(anyString());
    }
}