package com.example.TrafficProject.controller;

import com.example.TrafficProject.features.ConvertDateFormat;
import com.example.TrafficProject.features.DashboardFeatures;
import com.example.TrafficProject.model.GovApiData;
import com.example.TrafficProject.service.GovAPIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.text.ParseException;
import java.util.List;

@RestController
@RequestMapping
@CrossOrigin("*")
public class DashboardController {
    private final GovAPIService govAPIService;

    public DashboardController(GovAPIService govAPIService) {
        this.govAPIService = govAPIService;
    }

    @GetMapping(value = "/getTenHighestCarCountStreets")
    public List<GovApiData> tenHighestCarCount(@RequestParam String startDate,
                                               @RequestParam String endDate) throws ParseException {
        startDate = ConvertDateFormat.changeDateFormat(startDate);
        endDate = ConvertDateFormat.changeDateFormat(endDate);
        DashboardFeatures dashboardFeatures = new DashboardFeatures(this.govAPIService);
        return dashboardFeatures.getTenStreetsWithHighestCarCount(startDate,endDate);
    }
    @GetMapping(value = "/getMiniCardData")
    public List<Long> miniCardData(@RequestParam String startDate,
                                   @RequestParam String endDate) throws ParseException {
        startDate = ConvertDateFormat.changeDateFormat(startDate);
        endDate = ConvertDateFormat.changeDateFormat(endDate);
        DashboardFeatures dashboardFeatures = new DashboardFeatures(this.govAPIService);
        return dashboardFeatures.getMiniCardData(startDate,endDate);
    }
}
