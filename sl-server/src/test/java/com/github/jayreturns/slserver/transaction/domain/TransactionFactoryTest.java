package com.github.jayreturns.slserver.transaction.domain;

import com.github.jayreturns.slserver.transaction.api.TransactionData;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(MockitoExtension.class)
class TransactionFactoryTest {

    @InjectMocks
    private TransactionFactory transactionFactory;

    @Test
    void testFrom() {
        TransactionData transactionData = createMockDate();
        Transaction transaction = transactionFactory.from(transactionData);

        assertEquals(transactionData.getId(), transaction.getId());
        assertEquals(transactionData.getCategory(), transaction.getCategory());
        assertEquals(transactionData.getNotice(), transaction.getNotice());
        assertEquals(transactionData.getDate(), transaction.getDate());
        assertEquals(transactionData.getTitle(), transaction.getTitle());
    }

    private TransactionData createMockDate() {
        TransactionData transactionData = new TransactionData();
        transactionData.setId(UUID.randomUUID().toString());
        transactionData.setDate(LocalDateTime.now());
        transactionData.setTitle("Transaction 1");
        transactionData.setNotice("Auto Tanken");
        transactionData.setValue(70.99);
        transactionData.setCategory("TANKeN");
        return transactionData;
    }

}