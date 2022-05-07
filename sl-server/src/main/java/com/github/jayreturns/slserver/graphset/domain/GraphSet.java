package com.github.jayreturns.slserver.graphset.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
public class GraphSet {

    private LocalDate date;

    private Float expense;

    private Float income;

}
