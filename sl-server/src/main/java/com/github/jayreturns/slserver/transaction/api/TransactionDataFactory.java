package com.github.jayreturns.slserver.transaction.api;

import com.github.jayreturns.slserver.transaction.domain.Transaction;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class TransactionDataFactory {

    /**
     * Converts {@link Transaction} to {@link TransactionData}
     * @param transaction The Transaction to convert
     * @return The converted {@link TransactionData}
     */
    public TransactionData from(Transaction transaction) {
        TransactionData transactionData = new TransactionData();

        transactionData.setId(transaction.getId());
        transactionData.setCategory(transaction.getCategory());
        transactionData.setNotice(transaction.getNotice());
        transactionData.setTitle(transaction.getTitle());
        transactionData.setValue(transaction.getValue() / 100d);
        transactionData.setDate(transaction.getDate());

        return transactionData;
    }

    /**
     * Convert a list of {@link Transaction} to a list of {@link TransactionData}
     * @param transactions The list to convert
     * @return The converted List of {@link TransactionData}
     */
    public List<TransactionData> from(List<Transaction> transactions) {
        return transactions.stream()
                .map(this::from)
                .toList();
    }

}
