package com.github.jayreturns.slserver.graphset.api;

import com.github.jayreturns.slserver.graphset.domain.GraphSet;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class GraphSetDataFactory {

    public List<GraphSetData> from(List<GraphSet> graphSets) {
        return graphSets.stream()
                .map(graphSet -> new GraphSetData(graphSet.getDate(), graphSet.getExpense(), graphSet.getIncome()))
                .toList();
    }

}
