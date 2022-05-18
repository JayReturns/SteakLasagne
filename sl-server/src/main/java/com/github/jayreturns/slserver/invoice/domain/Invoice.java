package com.github.jayreturns.slserver.invoice.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "SL_INVOICE")
@Getter
@Setter
public class Invoice {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "INVOICE_SEQUENCE")
    @SequenceGenerator(name = "INVOICE_SEQUENCE", sequenceName = "SEQ_SL_INVOICE", allocationSize = 1)
    @Column(name = "ID")
    private Long id;

    @Column(name = "DATA", nullable = false)
    private byte[] data;

    @Column(name = "FILE_NAME", nullable = false)
    private String fileName;

    @Column(name = "MIME_TYPE", nullable = false)
    private String mimeType;

}
