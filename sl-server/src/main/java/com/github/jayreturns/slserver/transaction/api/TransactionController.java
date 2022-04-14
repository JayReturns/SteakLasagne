package com.github.jayreturns.slserver.transaction.api;

import com.github.jayreturns.slserver.transaction.service.TransactionService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(path = "expense")
public class TransactionController {
    private final TransactionService transactionService;
    private final TransactionDataFactory transactionDataFactory;

    public TransactionController(TransactionService transactionService, TransactionDataFactory transactionDataFactory) {
        this.transactionService = transactionService;
        this.transactionDataFactory = transactionDataFactory;
    }

    @GetMapping
    public List<TransactionData> getTransactions() {
        return transactionDataFactory.from(transactionService.getTransactions());
    }

    @GetMapping(path = "{id}")
    public TransactionData getTransaction(@PathVariable(name = "id") UUID uuid) {
        return transactionDataFactory.from(transactionService.getTransaction(uuid));
    }


}
