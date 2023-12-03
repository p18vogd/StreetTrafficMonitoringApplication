package com.example.TrafficProject.controller;

import com.example.TrafficProject.features.OverviewTrafficWriteToJSON;
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

    @GetMapping(value = "/getXML")
    public void getXMLFile(HttpServletResponse response) throws IOException, FileNotFoundException, ParserConfigurationException {
        List<GovApiData> dataList = new ArrayList<>();
        OverviewTrafficWriteToXML overviewTrafficWriteToXML = new OverviewTrafficWriteToXML(govAPIService);
        dataList = overviewTrafficWriteToXML.populateLists(dataList);
        overviewTrafficWriteToXML.writeXML(dataList);
        output = new File("Traffic.xml");
        try(InputStream inputStream = new FileInputStream(output)){
            response.setContentType("application/force-download");
            response.setHeader("Content-Disposition", "attachment; filename="+"Athens-Traffic.xml");
            IOUtils.copy(inputStream,response.getOutputStream());
            response.flushBuffer();
        }
    }

    @GetMapping(value = "/getXLSX")
    public void getXLSXFile(HttpServletResponse response) throws IOException {
        List<GovApiData> dataList = new ArrayList<>();
        OverviewTrafficWriteToXLSX overviewTrafficWriteToXLSX = new OverviewTrafficWriteToXLSX(govAPIService);
        dataList = overviewTrafficWriteToXLSX.populateLists(dataList);
        overviewTrafficWriteToXLSX.writeXLSX(dataList);
        output = new File("Traffic-Report.xlsx");

        try(InputStream inputStream = new FileInputStream(output)){
            response.setContentType("application/force-download");
            response.setHeader("Content-Disposition", "attachment; filename="+"Traffic-Report.xlsx");
            IOUtils.copy(inputStream,response.getOutputStream());
            response.flushBuffer();
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping(value = "/getJSON")
    public void getJSONFile(HttpServletResponse response) throws IOException {
        List<GovApiData> dataList = new ArrayList<>();
        OverviewTrafficWriteToJSON overviewTrafficWriteToJSON = new OverviewTrafficWriteToJSON(govAPIService);
        dataList = overviewTrafficWriteToJSON.populateLists(dataList);
        overviewTrafficWriteToJSON.writeToJSON(dataList);
        output = new File("file.json");

        try(InputStream inputStream = new FileInputStream(output)){
            response.setContentType("application/force-download");
            response.setHeader("Content-Disposition", "attachment; filename="+"file.json");
            IOUtils.copy(inputStream,response.getOutputStream());
            response.flushBuffer();
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        }
    }
}
