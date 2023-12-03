package com.example.TrafficProject.features;

import com.example.TrafficProject.model.GovApiData;
import com.example.TrafficProject.service.GovAPIService;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.FileWriter;
import java.io.IOException;
import java.util.List;

public class OverviewTrafficWriteToJSON {
    private final GovAPIService govAPIService;
    public OverviewTrafficWriteToJSON(GovAPIService govAPIService) {
        this.govAPIService = govAPIService;
    }

    public List<GovApiData> populateLists(List<GovApiData> dataList){
        return this.govAPIService.getGOVTrafficData().block();
    }

    public void writeToJSON(List<GovApiData> dataList){
        JSONArray jsonArray = new JSONArray(dataList);
        String filePath = "file.json";
        try (FileWriter fileWriter = new FileWriter(filePath)) {
            fileWriter.write(jsonArray.toString());
            System.out.println("JSON written to " + filePath);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
