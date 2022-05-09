package com.github.jayreturns.slserver.graphset.api;

import com.github.jayreturns.slserver.graphset.service.GraphSetService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping(path = "graphset", produces = MediaType.APPLICATION_JSON_VALUE)
public class GraphSetController {

    private final GraphSetService graphSetService;
    private final GraphSetDataFactory graphSetDataFactory;

    public GraphSetController(GraphSetService graphSetService, GraphSetDataFactory graphSetDataFactory) {
        this.graphSetService = graphSetService;
        this.graphSetDataFactory = graphSetDataFactory;
    }

    @GetMapping
    public List<GraphSetData> getGraphSets(@RequestParam(required = false, defaultValue = "-999999999-01-01")
                                               @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate after) {
        return graphSetDataFactory.from(graphSetService.getGraphSets(after));
    }

}
