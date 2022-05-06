package com.github.jayreturns.slserver.graphset.api;

import com.github.jayreturns.slserver.graphset.service.GraphSetService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
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

    @GetMapping()
    public List<GraphSetData> getGraphSets(@Valid @RequestBody GraphSetData graphSetData) {
        return graphSetDataFactory.from(graphSetService.getGraphSets(graphSetData.getDate()));
    }

}
