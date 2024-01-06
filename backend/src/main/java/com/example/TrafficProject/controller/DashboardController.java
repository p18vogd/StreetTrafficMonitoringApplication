package com.example.TrafficProject.controller;

import com.example.TrafficProject.features.ConvertDateFormat;
import com.example.TrafficProject.features.DashboardFeatures;
import com.example.TrafficProject.model.GovApiData;
import com.example.TrafficProject.service.GovAPIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping
@CrossOrigin("*")
public class DashboardController {
    private final GovAPIService govAPIService;
    private List<GovApiData> sortedData;

    public DashboardController(GovAPIService govAPIService) {
        this.govAPIService = govAPIService;
    }

    private void sortData(String startDate, String endDate) throws ParseException {
        startDate = ConvertDateFormat.changeDateFormat(startDate);
        endDate = ConvertDateFormat.changeDateFormat(endDate);
        DashboardFeatures dashboardFeatures = new DashboardFeatures(this.govAPIService);
        sortedData = new ArrayList<>(dashboardFeatures.sortStreetData(startDate,endDate));
    }

    @GetMapping(value = "/getTenHighestCarCountStreets")
    public List<GovApiData> tenHighestCarCount(@RequestParam String startDate,
                                               @RequestParam String endDate) throws ParseException {
        sortData(startDate, endDate);
        DashboardFeatures dashboardFeatures = new DashboardFeatures(this.govAPIService);
        List<GovApiData> highCongestionData = sortedData;
        return dashboardFeatures.getTenStreetsWithHighestCarCount(highCongestionData);
    }

    @GetMapping(value = "/getLowCongestionData")
    public List<GovApiData> lowCongestionStreets(@RequestParam String startDate,
                                                 @RequestParam String endDate) throws ParseException {
        sortData(startDate, endDate);
        DashboardFeatures dashboardFeatures = new DashboardFeatures(this.govAPIService);
        return dashboardFeatures.getLowCongestionData(sortedData);
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
