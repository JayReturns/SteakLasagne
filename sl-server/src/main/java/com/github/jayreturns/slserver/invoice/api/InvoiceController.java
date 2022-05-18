package com.github.jayreturns.slserver.invoice.api;

import com.github.jayreturns.slserver.invoice.domain.Invoice;
import com.github.jayreturns.slserver.invoice.domain.InvoiceFactory;
import com.github.jayreturns.slserver.invoice.service.InvoiceService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping(path = "invoice")
public class InvoiceController {

    private final InvoiceDataFactory invoiceDataFactory;
    private final InvoiceService invoiceService;
    private final InvoiceFactory invoiceFactory;

    public InvoiceController(InvoiceDataFactory invoiceDataFactory, InvoiceService invoiceService, InvoiceFactory invoiceFactory) {
        this.invoiceDataFactory = invoiceDataFactory;
        this.invoiceService = invoiceService;
        this.invoiceFactory = invoiceFactory;
    }

    @GetMapping(path = "{id}")
    public ResponseEntity<byte[]> downloadInvoice(@PathVariable Long id, @RequestHeader String referer) {
        if (referer == null || referer.isEmpty()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        Invoice invoice = invoiceService.getInvoice(id);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(invoice.getMimeType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=%s".formatted(invoice.getFileName()))
                .body(invoice.getData());
    }

    @PostMapping(path = "{transactionId}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<InvoiceData> createInvoice(@PathVariable String transactionId, @Valid @RequestBody InvoiceData invoiceData) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(invoiceDataFactory.from(invoiceService.createInvoice(transactionId, invoiceFactory.from(invoiceData))));
    }

    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<InvoiceData> updateInvoice(@Valid @RequestBody InvoiceData invoiceData) {
        return ResponseEntity.ok(
                invoiceDataFactory.from(invoiceService.updateInvoice(invoiceFactory.from(invoiceData)))
        );
    }


}
