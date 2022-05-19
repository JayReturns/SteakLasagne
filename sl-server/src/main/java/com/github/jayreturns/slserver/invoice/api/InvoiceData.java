package com.github.jayreturns.slserver.invoice.api;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class InvoiceData {

    private Long id;

    @NotNull
    private byte[] data;

    @NotBlank
    private String fileName;

    @NotBlank
    private String mimeType;

}
