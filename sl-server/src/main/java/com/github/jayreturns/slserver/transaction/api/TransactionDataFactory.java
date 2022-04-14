package com.github.jayreturns.slserver.transaction.api;

import com.github.jayreturns.slserver.transaction.domain.Transaction;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class TransactionDataFactory {

    public TransactionData from(Transaction transaction) {
        TransactionData transactionData = new TransactionData();

        transactionData.setId(transaction.getId());
        transactionData.setCategory(transaction.getCategory());
        transactionData.setNotice(transaction.getNotice());
        transactionData.setTitle(transaction.getTitle());
        transactionData.setValue(transaction.getValue());
        transactionData.setDate(transaction.getDate());

        return transactionData;
    }

    public List<TransactionData> from(List<Transaction> transactions) {
        return transactions.stream()
                .map(this::from)
                .collect(Collectors.toList());
    }

}
