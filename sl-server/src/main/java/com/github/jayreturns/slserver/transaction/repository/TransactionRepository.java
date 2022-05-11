package com.github.jayreturns.slserver.transaction.repository;

import com.github.jayreturns.slserver.transaction.domain.Transaction;
import com.github.jayreturns.slserver.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, String> {

    List<Transaction> getAllByDateAfter(LocalDateTime after);
    List<Transaction> getAllByUser(User user);

}
