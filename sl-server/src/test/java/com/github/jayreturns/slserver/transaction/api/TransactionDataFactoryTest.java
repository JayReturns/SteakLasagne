package com.github.jayreturns.slserver.transaction.api;

import com.github.jayreturns.slserver.transaction.domain.Transaction;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.IntStream;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class TransactionDataFactoryTest {

    @Mock
    private Transaction transaction;
    @InjectMocks
    private TransactionDataFactory transactionDataFactory;

    @Test
    void testFrom() {
        setUpTransaction();

        TransactionData result = transactionDataFactory.from(transaction);

        assertEqualsTransaction(transaction, result);
    }

    @Test
    void testFromList() {
        setUpTransaction();

        List<Transaction> expectedList = List.of(transaction);
        List<TransactionData> result = transactionDataFactory.from(expectedList);

        assertEquals(expectedList.size(), result.size());
        assertFalse(result.isEmpty());

        IntStream.range(0, result.size()).forEach(index -> {
            assertEqualsTransaction(expectedList.get(index), result.get(index));
        });
    }

    private void assertEqualsTransaction(Transaction expected, TransactionData actual) {
        assertEquals(expected.getId(), actual.getId());
        assertEquals(expected.getCategory(), actual.getCategory());
        assertEquals(expected.getDate(), actual.getDate());
        assertEquals(expected.getNotice(), actual.getNotice());
        assertEquals(expected.getTitle(), actual.getTitle());
        assertEquals(expected.getValue(), actual.getValue());
    }

    private void setUpTransaction() {
        when(transaction.getId()).thenReturn(UUID.randomUUID().toString());
        when(transaction.getDate()).thenReturn(LocalDateTime.now());
        when(transaction.getCategory()).thenReturn("My Category");
        when(transaction.getNotice()).thenReturn("My Notice");
        when(transaction.getTitle()).thenReturn("My Title");
        when(transaction.getValue()).thenReturn(15f);
    }

}