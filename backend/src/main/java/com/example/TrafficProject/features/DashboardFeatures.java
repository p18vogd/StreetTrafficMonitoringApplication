package com.example.TrafficProject.features;

import com.example.TrafficProject.model.GovApiData;
import com.example.TrafficProject.service.GovAPIService;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public class DashboardFeatures {
    private final GovAPIService govAPIService;
    public DashboardFeatures(GovAPIService govAPIService) {
        this.govAPIService = govAPIService;
    }

    public List<GovApiData> populateLists(List<GovApiData> dataList, String startDate, String endDate){
        return this.govAPIService.getGOVTrafficData(startDate,endDate).block();
    }

    public List<GovApiData> getTenStreetsWithHighestCarCount(String startDate, String endDate){
        List<GovApiData> streetData = this.govAPIService.getGOVTrafficData(startDate,endDate).block();

        return streetData.stream()
                .sorted(Comparator.comparingDouble(GovApiData::getCountedCars).reversed())
                .limit(10)
                .collect(Collectors.toList());
    }
}
