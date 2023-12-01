package com.example.TrafficProject.service;

import com.example.TrafficProject.model.TrafficData;
import org.apache.poi.ss.formula.functions.T;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientException;
import org.springframework.web.util.UriBuilder;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.net.URI;
import java.util.List;

@Service
public class RestClient {

    @Value("${tomtom.api.key}")
    private  String apiKey;

    @Value("${tomtom.api.url}")
    private  String apiUrl;

    private final WebClient webClient;

    public RestClient(WebClient.Builder webClientBuilder ){
        this.webClient = webClientBuilder.baseUrl("https://api.tomtom.com").build();
    }

    public Mono<TrafficData> getTrafficData(){
        return this.webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/traffic/services/4/flowSegmentData/absolute/10/json")
                        .queryParam("key",apiKey)
                        .queryParam("point","52.41072,4.84239")
                        .build())
                .retrieve()
                .bodyToMono(TrafficData.class);

    }
}
