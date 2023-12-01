package com.example.TrafficProject.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class TrafficData {
    @JsonProperty("currentSpeed")
    private Double currentSpeed;

    public Double getCurrentSpeed() {
        return currentSpeed;
    }

    public void setCurrentSpeed(Double currentSpeed) {
        this.currentSpeed = currentSpeed;
    }

    @Override
    public String toString() {
        return "TrafficData{" +
                "currentSpeed='" + currentSpeed + '\'' +
                '}';
    }
}
