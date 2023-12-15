package com.example.TrafficProject.service;

import com.example.TrafficProject.model.GovApiData;
import com.example.TrafficProject.model.TrafficData;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;

@Service
public class GovAPIService {

    @Value("${gov.api.key}")
    private  String apiKey;

    private final WebClient webClient;

    public GovAPIService(WebClient.Builder webClientBuilder ){
        this.webClient = webClientBuilder.baseUrl("https://data.gov.gr").build();
    }
    public Mono<List<GovApiData>> getGOVTrafficData(String date){
        return this.webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/api/v1/query/road_traffic_attica")
                        .queryParam("date_from",date)
                        .queryParam("date_to",date)
                        .build())
                .header("Authorization",apiKey)
                .retrieve()
                .bodyToFlux(GovApiData.class)
                .collectList();
    }
}
