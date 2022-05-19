package com.github.jayreturns.slserver.graphset.service;

import com.github.jayreturns.slserver.graphset.domain.GraphSet;
import com.github.jayreturns.slserver.shared.api.AtomicFloat;
import com.github.jayreturns.slserver.transaction.domain.Transaction;
import com.github.jayreturns.slserver.transaction.repository.TransactionRepository;
import com.github.jayreturns.slserver.user.domain.User;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.*;

@Service
public class GraphSetService {

    private final TransactionRepository transactionRepository;

    public GraphSetService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public List<GraphSet> getGraphSets(User user, LocalDate after) {
        List<Transaction> transactions = transactionRepository.getAllByUserAndDateAfter(user, after.atStartOfDay());

        Map<Timestamp, List<Transaction>> map = new HashMap<>();

        // Remove time
        transactions.forEach(t -> t.setDate(t.getDate().toLocalDate().atStartOfDay()));

        // Correct amount
        transactions.forEach(t -> t.setValue(t.getValue() / 100));

        transactions.forEach(t -> {
            Timestamp time = Timestamp.valueOf(t.getDate());
            if (map.containsKey(time)) {
                map.get(time).add(t);
            } else {
                map.put(time, new ArrayList<>(List.of(t)));
            }
        });

        Map<LocalDate, Pair<Float, Float>> cumulatedMap = new HashMap<>();

        map.forEach((time, transactionList) -> {
            AtomicFloat income = new AtomicFloat();
            AtomicFloat expense = new AtomicFloat();
            transactionList.stream().map(Transaction::getValue).forEach(value -> {
                if (value > 0) {
                    income.set(income.get() + value);
                } else {
                    expense.set(expense.get() + Math.abs(value));
                }
            });
            cumulatedMap.put(time.toLocalDateTime().toLocalDate(), Pair.of(expense.get(), income.get()));
        });

        List<GraphSet> sets = new ArrayList<>();
        cumulatedMap.forEach((time, pair) -> sets.add(new GraphSet(time, pair.getFirst(), pair.getSecond())));

        Collections.sort(sets);

        return sets;
    }

}
