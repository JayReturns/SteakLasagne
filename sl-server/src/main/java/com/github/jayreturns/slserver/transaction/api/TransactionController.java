package com.github.jayreturns.slserver.transaction.api;

import com.github.jayreturns.slserver.transaction.domain.TransactionFactory;
import com.github.jayreturns.slserver.transaction.service.TransactionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(path = "transaction")
public class TransactionController {

    private final TransactionService transactionService;
    private final TransactionDataFactory transactionDataFactory;
    private final TransactionFactory transactionFactory;

    public TransactionController(TransactionService transactionService, TransactionDataFactory transactionDataFactory, TransactionFactory transactionFactory) {
        this.transactionService = transactionService;
        this.transactionDataFactory = transactionDataFactory;
        this.transactionFactory = transactionFactory;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<TransactionData> getTransactions() {
        return transactionDataFactory.from(transactionService.getTransactions());
    }

    @GetMapping(path = "{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public TransactionData getTransaction(@PathVariable(name = "id") String uuid) {
        return transactionDataFactory.from(transactionService.getTransaction(uuid));
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<TransactionData> createTransaction(@RequestBody @Valid TransactionData transactionData) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(transactionDataFactory.from(transactionService.createTransaction(transactionFactory.from(transactionData))));
    }

    @PutMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<TransactionData> updateTransaction(@Valid @RequestBody TransactionData transactionData) {
        return ResponseEntity
                .ok(transactionDataFactory.from(transactionService.updateTransaction(transactionFactory.from(transactionData))));
    }

    @DeleteMapping(path = "{id}")
    public void deleteTransaction(@PathVariable String id) {
        transactionService.deleteTransaction(id);
    }

}
