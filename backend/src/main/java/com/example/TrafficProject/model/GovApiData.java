package com.example.TrafficProject.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Date;
import java.util.List;


public class GovApiData {
    @JsonProperty("road_name")
    private String road_name;
    @JsonProperty("road_info")
    private String roadInfo;
    @JsonProperty("countedcars")
    private Integer countedCars;
    @JsonProperty("average_speed")
    private Double averageSpeed;
    @JsonProperty("appprocesstime")
    private Date timestamp;

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public Double getAverageSpeed() {
        return averageSpeed;
    }

    public void setAverageSpeed(Double averageSpeed) {
        this.averageSpeed = averageSpeed;
    }

    public Integer getCountedCars() {
        return countedCars;
    }

    public void setCountedCars(Integer countedCars) {
        this.countedCars = countedCars;
    }

    public String getRoadInfo() {
        return roadInfo;
    }

    public void setRoadInfo(String roadInfo) {
        this.roadInfo = roadInfo;
    }

    public String getRoad_name() {
        return road_name;
    }

    public void setRoad_name(String road_name) {
        this.road_name = road_name;
    }

    @Override
    public String toString() {
        return "GovApiData{" +
                "road_name='" + road_name + '\'' +
                ", roadInfo='" + roadInfo + '\'' +
                ", countedCars=" + countedCars +
                ", averageSpeed=" + averageSpeed +
                ", timestamp=" + timestamp +
                '}';
    }
}
