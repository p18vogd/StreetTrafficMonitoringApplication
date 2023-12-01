package com.example.TrafficProject.features;

import com.example.TrafficProject.model.GovApiData;
import com.example.TrafficProject.service.GovAPIService;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.*;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;


public class OverviewTrafficWriteToXML {

    private final GovAPIService govAPIService;
    public OverviewTrafficWriteToXML(GovAPIService govAPIService) {
        this.govAPIService = govAPIService;
    }

    public List<GovApiData> populateLists(List<GovApiData> dataList){
        return this.govAPIService.getGOVTrafficData().block();
    }
    public void writeXML(List<GovApiData> dataList) throws ParserConfigurationException {
        DocumentBuilderFactory documentBuilderFactory = DocumentBuilderFactory.newInstance();
        DocumentBuilder documentBuilder = documentBuilderFactory.newDocumentBuilder();
        Document document = documentBuilder.newDocument();


        Element rootElement = document.createElement("TrafficMonitoring");
        document.appendChild(rootElement);

        for(GovApiData data : dataList){
            // Create Parent Node for each measurement
            Element measurementElement = document.createElement("Measurement");
            measurementElement.setAttribute("timestamp", data.getTimestamp().toString());

            // Write to XML Average Speed //
            Element averageSpeed = document.createElement("averageSpeed");
            averageSpeed.appendChild(document.createTextNode(data.getAverageSpeed().toString()));
            measurementElement.appendChild(averageSpeed);

            // Write to XML Counted Cars //
            Element countedCars = document.createElement("countedCars");
            countedCars.appendChild(document.createTextNode(data.getCountedCars().toString()));
            measurementElement.appendChild(countedCars);

            // Write to XML Street Name //
            Element streetName = document.createElement("roadName");
            streetName.appendChild(document.createTextNode(data.getRoad_name()));
            measurementElement.appendChild(streetName);

            // Write to XML roadInfo //
            Element roadInfo = document.createElement("roadInfo");
            roadInfo.appendChild(document.createTextNode(data.getRoadInfo()));
            measurementElement.appendChild(roadInfo);

            rootElement.appendChild(measurementElement);
        }



        try (FileOutputStream output = new FileOutputStream("Traffic.xml")) {
            TransformerFactory transformerFactory = TransformerFactory.newInstance();
            Transformer transformer = transformerFactory.newTransformer();
            transformer.setOutputProperty(OutputKeys.ENCODING, "UTF-8");
            transformer.setOutputProperty(OutputKeys.INDENT, "yes");
            DOMSource source = new DOMSource(document);
            StreamResult result = new StreamResult(output);

            transformer.transform(source, result);
        } catch (IOException e) {
            e.printStackTrace();
        } catch (TransformerConfigurationException e) {
            throw new RuntimeException(e);
        } catch (TransformerException e) {
            throw new RuntimeException(e);
        }
    }
}
