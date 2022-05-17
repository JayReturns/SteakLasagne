package com.github.jayreturns.slserver.graphset.api;

import com.github.jayreturns.slserver.graphset.service.GraphSetService;
import com.github.jayreturns.slserver.user.service.UserService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping(path = "graphset", produces = MediaType.APPLICATION_JSON_VALUE)
public class GraphSetController {

    private final GraphSetService graphSetService;
    private final GraphSetDataFactory graphSetDataFactory;
    private final UserService userService;

    public GraphSetController(GraphSetService graphSetService, GraphSetDataFactory graphSetDataFactory, UserService userService) {
        this.graphSetService = graphSetService;
        this.graphSetDataFactory = graphSetDataFactory;
        this.userService = userService;
    }

    @GetMapping(path = "{userId}")
    public List<GraphSetData> getGraphSets(@RequestParam(required = false, defaultValue = "-999999999-01-01")
                                               @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate after,
                                           @PathVariable String userId) {
        return graphSetDataFactory.from(graphSetService.getGraphSets(userService.getUser(userId), after));
    }

}
