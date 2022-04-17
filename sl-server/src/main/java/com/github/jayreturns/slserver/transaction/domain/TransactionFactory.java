package com.github.jayreturns.slserver.transaction.domain;

import com.github.jayreturns.slserver.transaction.api.TransactionData;
import org.springframework.stereotype.Component;

@Component
public class TransactionFactory {

    /**
     * Converts {@link TransactionData} to {@link Transaction}
     * @param transactionData The TransactionData to convert
     * @return The converted {@link Transaction}
     */
    public Transaction from(TransactionData transactionData) {
        Transaction transaction = new Transaction();

        transaction.setValue(transactionData.getValue());
        transaction.setTitle(transactionData.getTitle());
        transaction.setNotice(transactionData.getNotice());
        transaction.setDate(transactionData.getDate());
        transaction.setCategory(transactionData.getCategory());
        transaction.setId(transactionData.getId());

        return transaction;
    }

}
