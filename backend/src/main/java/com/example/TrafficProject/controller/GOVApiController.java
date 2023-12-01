package com.example.TrafficProject.controller;

import com.example.TrafficProject.features.OverviewTrafficWriteToXML;
import com.example.TrafficProject.model.GovApiData;
import com.example.TrafficProject.model.TrafficData;
import com.example.TrafficProject.service.GovAPIService;
import com.example.TrafficProject.service.RestClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequestMapping
@CrossOrigin("*")
public class GOVApiController {
    private final GovAPIService govAPIService;

    public GOVApiController(GovAPIService govAPIService) {
        this.govAPIService = govAPIService;
    }

    @GetMapping(value = "/gov")
    public Mono<List<GovApiData>> fetchData() {
        return govAPIService.getGOVTrafficData();
    }
}
