package com.example.TrafficProject.controller;

import com.example.TrafficProject.features.OverviewTrafficWriteToXLSX;
import com.example.TrafficProject.features.OverviewTrafficWriteToXML;
import com.example.TrafficProject.model.GovApiData;
import com.example.TrafficProject.service.GovAPIService;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.poi.util.IOUtils;
import org.apache.xmlbeans.impl.common.IOUtil;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import javax.xml.parsers.ParserConfigurationException;
import java.io.*;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping
@CrossOrigin("*")
public class OverviewTrafficXMLController {
    private final GovAPIService govAPIService;
    private static File output;

    public OverviewTrafficXMLController(GovAPIService govAPIService) {
        this.govAPIService = govAPIService;
    }
//Mono<List<GovApiData>>
    @GetMapping(value = "/getXML")
    public void getXMLFile(HttpServletResponse response) throws IOException, FileNotFoundException, ParserConfigurationException {
        List<GovApiData> dataList = new ArrayList<>();
        OverviewTrafficWriteToXML overviewTrafficWriteToXML = new OverviewTrafficWriteToXML(govAPIService);
        dataList = overviewTrafficWriteToXML.populateLists(dataList);
        overviewTrafficWriteToXML.writeXML(dataList);
        output = new File("Athens-Traffic.xml");
        System.out.println(output.getAbsolutePath());
        try(InputStream inputStream = new FileInputStream(output)){
            response.setContentType("application/force-download");
            response.setHeader("Content-Disposition", "attachment; filename="+"Athens-Traffic.xml");
            IOUtils.copy(inputStream,response.getOutputStream());
            response.flushBuffer();
        }
       // return govAPIService.getGOVTrafficData();
    }

    @GetMapping(value = "/getXLSX")
    public Mono<List<GovApiData>> getXLSXFile() throws ParserConfigurationException {
        List<GovApiData> dataList = new ArrayList<>();
        OverviewTrafficWriteToXLSX overviewTrafficWriteToXLSX = new OverviewTrafficWriteToXLSX(govAPIService);
        dataList = overviewTrafficWriteToXLSX.populateLists(dataList);
        overviewTrafficWriteToXLSX.writeXLSX(dataList);
        return govAPIService.getGOVTrafficData();
    }
}
