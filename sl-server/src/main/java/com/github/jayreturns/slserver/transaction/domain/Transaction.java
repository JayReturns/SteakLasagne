package com.github.jayreturns.slserver.transaction.domain;

import com.github.jayreturns.slserver.invoice.domain.Invoice;
import com.github.jayreturns.slserver.user.domain.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "SL_TRANSACTION")
@Getter
@Setter
public class Transaction {

    @Id
    @Column(name = "ID", nullable = false, unique = true)
    private String id;

    @ManyToOne
    @JoinColumn(name = "USER_ID")
    private User user;

    @Column(name = "TITLE")
    private String title;

    @Column(name = "CATEGORY")
    private String category;

    @Column(name = "NOTICE")
    private String notice;

    @Column(name = "VALUE")
    private Long value;

    @Column(name = "DATE")
    private LocalDateTime date;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "INVOICE_ID")
    private Invoice invoice;

}
