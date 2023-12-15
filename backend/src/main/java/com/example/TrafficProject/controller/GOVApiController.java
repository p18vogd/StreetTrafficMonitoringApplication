package com.example.TrafficProject.controller;

import com.example.TrafficProject.features.ConvertDateFormat;
import com.example.TrafficProject.features.OverviewTrafficWriteToXML;
import com.example.TrafficProject.model.GovApiData;
import com.example.TrafficProject.model.TrafficData;
import com.example.TrafficProject.service.GovAPIService;
import com.example.TrafficProject.service.RestClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import javax.swing.text.DateFormatter;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
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
    public Mono<List<GovApiData>> fetchData(@RequestParam String date) throws ParseException {
        date = ConvertDateFormat.changeDateFormat(date);
        System.out.println(date);
        return govAPIService.getGOVTrafficData(date);
    }
}
