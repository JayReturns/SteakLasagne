package com.github.jayreturns.slserver.invoice.service;

import com.github.jayreturns.slserver.invoice.domain.Invoice;
import com.github.jayreturns.slserver.invoice.repository.InvoiceRepository;
import com.github.jayreturns.slserver.transaction.domain.Transaction;
import com.github.jayreturns.slserver.transaction.service.TransactionService;
import org.springframework.stereotype.Service;

@Service
public class InvoiceService {

    private final InvoiceRepository invoiceRepository;
    private final TransactionService transactionService;

    public InvoiceService(InvoiceRepository invoiceRepository, TransactionService transactionService) {
        this.invoiceRepository = invoiceRepository;
        this.transactionService = transactionService;
    }

    public Invoice getInvoice(Long id) {
        return invoiceRepository.findById(id).orElseThrow();
    }

    public Invoice createInvoice(String transactionId, Invoice invoice) {
        Transaction transaction = transactionService.getTransaction(transactionId);
        transaction.setInvoice(invoice);
        return transactionService.updateTransaction(transaction).getInvoice();
    }

    public Invoice updateInvoice(Invoice newInvoice) {
        Invoice invoice = invoiceRepository.findById(newInvoice.getId()).orElseThrow();

        invoice.setMimeType(newInvoice.getMimeType());
        invoice.setFileName(newInvoice.getFileName());
        invoice.setData(newInvoice.getData());

        return invoiceRepository.save(invoice);
    }
}
