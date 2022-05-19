package com.github.jayreturns.slserver.invoice.api;

import com.github.jayreturns.slserver.invoice.domain.Invoice;
import org.springframework.stereotype.Component;

@Component
public class InvoiceDataFactory {

    public InvoiceData from(Invoice invoice) {
        InvoiceData data = new InvoiceData();

        data.setId(invoice.getId());
        data.setData(invoice.getData());
        data.setFileName(invoice.getFileName());
        data.setMimeType(invoice.getMimeType());

        return data;
    }

}
