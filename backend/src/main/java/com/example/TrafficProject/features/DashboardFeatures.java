package com.example.TrafficProject.features;

import com.example.TrafficProject.model.GovApiData;
import com.example.TrafficProject.service.GovAPIService;

import java.util.*;
import java.util.stream.Collectors;
import java.text.NumberFormat;

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
                .collect(Collectors.groupingBy(GovApiData::getRoad_name)) // Group by road name
                .values().stream()
                .map(roadDatas -> roadDatas.stream()
                        .max(Comparator.comparingInt(GovApiData::getCountedCars))) // Get the road data with the max counted cars for each road
                .filter(Optional::isPresent)
                .map(Optional::get)
                .sorted((rd1, rd2) -> rd2.getCountedCars() - rd1.getCountedCars()) // Sort in descending order of counted cars
                .limit(10) // Limit to top 10
                .collect(Collectors.toList());
    }

    public List<Long> getMiniCardData(String startDate, String endDate){
        List<GovApiData> streetData = this.govAPIService.getGOVTrafficData(startDate,endDate).block();
        List<Long> miniCardList = new ArrayList<>();

        long numberOfVehicles = streetData.stream()
                .map(GovApiData::getCountedCars)
                .mapToInt(Integer::intValue).sum();

        NumberFormat numberFormat = NumberFormat.getNumberInstance(Locale.GERMANY);
        String formattedNumber = numberFormat.format(numberOfVehicles);
        miniCardList.add(numberOfVehicles);
        System.out.println("Nummber Of Vehicles passed " + formattedNumber);

        long averageSpeedAcrossNetwork = (long) streetData.stream()
                .map(GovApiData::getAverageSpeed)
                .mapToInt(Double::intValue)
                .average()
                .orElse(0);
        miniCardList.add(averageSpeedAcrossNetwork);
        System.out.println("Average Speed " + averageSpeedAcrossNetwork);

        long numberOfRoads = (long) streetData.stream()
                .map(GovApiData::getRoad_name)
                .distinct()
                .count();
        miniCardList.add(numberOfRoads);
        System.out.println("Number of Roads " + numberOfRoads);
        return miniCardList;
    }
}
