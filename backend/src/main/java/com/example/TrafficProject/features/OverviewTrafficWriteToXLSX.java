package com.example.TrafficProject.features;

import com.example.TrafficProject.model.GovApiData;
import com.example.TrafficProject.service.GovAPIService;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.*;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

public class OverviewTrafficWriteToXLSX {
    private final GovAPIService govAPIService;
    public OverviewTrafficWriteToXLSX(GovAPIService govAPIService) {
        this.govAPIService = govAPIService;
    }

    public List<GovApiData> populateLists(List<GovApiData> dataList,String startDate,String endDate){
        return this.govAPIService.getGOVTrafficData(startDate,endDate).block();
    }

    public void writeXLSX(List<GovApiData> dataList){
        XSSFWorkbook workbook = new XSSFWorkbook();
        XSSFSheet spreadsheet = workbook.createSheet(" Athens Traffic Report ");


        XSSFCellStyle headerStyle = workbook.createCellStyle();
        headerStyle.setBorderTop(BorderStyle.THICK);
        headerStyle.setBorderBottom(BorderStyle.THICK);
        headerStyle.setBorderLeft(BorderStyle.THICK);
        headerStyle.setBorderRight(BorderStyle.THICK);

        XSSFFont font = workbook.createFont();
        font.setFontHeightInPoints((short)14);
        font.setBold(true);

        headerStyle.setFont(font);

        XSSFCellStyle style = workbook.createCellStyle();
        style.setBorderTop(BorderStyle.THIN);
        style.setBorderBottom(BorderStyle.THIN);
        style.setBorderLeft(BorderStyle.THIN);
        style.setBorderRight(BorderStyle.THIN);

        Row header = spreadsheet.createRow(0);

        Cell headerCell = header.createCell(0);
        headerCell.setCellValue("Timestamp");
        headerCell.setCellStyle(headerStyle);

        headerCell = header.createCell(1);
        headerCell.setCellValue("Road Name");
        headerCell.setCellStyle(headerStyle);

        headerCell = header.createCell(2);
        headerCell.setCellValue("Counted Cars");
        headerCell.setCellStyle(headerStyle);

        headerCell = header.createCell(3);
        headerCell.setCellValue("Average Speed");
        headerCell.setCellStyle(headerStyle);

        headerCell = header.createCell(4);
        headerCell.setCellValue("Road Info");
        headerCell.setCellStyle(headerStyle);

        int cellCounter = 0;

        for(GovApiData data : dataList){
            cellCounter++;
            Row row = spreadsheet.createRow(cellCounter);

            Cell cell = row.createCell(0);
            cell.setCellValue(data.getTimestamp().toString());
            cell.setCellStyle(style);

            cell = row.createCell(1);
            cell.setCellValue(data.getRoad_name());
            cell.setCellStyle(style);

            cell = row.createCell(2);
            cell.setCellValue(data.getCountedCars());
            cell.setCellStyle(style);

            cell = row.createCell(3);
            cell.setCellValue(data.getAverageSpeed());
            cell.setCellStyle(style);

            cell = row.createCell(4);
            cell.setCellValue(data.getRoadInfo());
            cell.setCellStyle(style);
        }

        spreadsheet.autoSizeColumn(0);
        spreadsheet.autoSizeColumn(1);
        spreadsheet.autoSizeColumn(2);
        spreadsheet.autoSizeColumn(3);
        spreadsheet.autoSizeColumn(4);

        try {
            FileOutputStream out = new FileOutputStream("Traffic-Report.xlsx");
            workbook.write(out);
            out.close();
            workbook.close();
            System.out.println("Excel written successfully..");


        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
