package com.github.jayreturns.slserver.graphset.api;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.PastOrPresent;
import java.time.LocalDate;

@Data
@AllArgsConstructor
public class GraphSetData {

    @PastOrPresent
    private LocalDate date;

    private Float sum;

}
