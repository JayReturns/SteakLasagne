package com.github.jayreturns.slserver.transaction.api;

import com.github.jayreturns.slserver.invoice.domain.Invoice;
import com.github.jayreturns.slserver.user.domain.User;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

/**
 * DTO for {@link com.github.jayreturns.slserver.transaction.domain.Transaction}
 */
@Data
public class TransactionData {

    private String id;

    @NotBlank
    private User user;

    @NotBlank
    private String title;

    private String category;

    private String notice;

    @NotNull
    private Double value;

    private LocalDateTime date;

    private String invoiceLink;

    private Invoice invoice;

}
