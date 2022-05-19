package com.github.jayreturns.slserver.invoice.repository;

import com.github.jayreturns.slserver.invoice.domain.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
}
