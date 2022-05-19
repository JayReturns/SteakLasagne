package com.github.jayreturns.slserver.invoice.domain;

import com.github.jayreturns.slserver.invoice.api.InvoiceData;
import org.springframework.stereotype.Component;

@Component
public class InvoiceFactory {

    public Invoice from(InvoiceData data) {
        Invoice invoice = new Invoice();

        invoice.setData(data.getData());
        invoice.setId(data.getId());
        invoice.setFileName(data.getFileName());
        invoice.setMimeType(data.getMimeType());

        return invoice;
    }

}
