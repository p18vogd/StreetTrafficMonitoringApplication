package com.example.TrafficProject.controller;

import com.example.TrafficProject.model.TrafficData;
import com.example.TrafficProject.service.RestClient;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping
@CrossOrigin("*")
public class TomTomController {

    private final RestClient restClientService;

    public TomTomController(RestClient restClientService) {
        this.restClientService = restClientService;
    }

    @GetMapping(value = "/traffic")
    public Mono<TrafficData> fetchData() {
        return restClientService.getTrafficData();
    }
}
