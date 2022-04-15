package com.github.jayreturns.slserver.transaction.api;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PastOrPresent;
import java.time.LocalDateTime;

@Data
public class TransactionData {

    private String id;

    @NotBlank
    private String title;

    private String category;

    private String notice;

    @NotNull
    private Integer value;

    @PastOrPresent(message = "Date hast to be in past or present")
    private LocalDateTime date;

}
