package com.github.jayreturns.slserver.graphset.domain;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
public class GraphSet implements Comparable<GraphSet> {

    private LocalDate date;

    private Float expense;

    private Float income;

    @Override
    public int compareTo(GraphSet o) {
        return this.getDate().compareTo(o.getDate());
    }
}
