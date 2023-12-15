package com.example.TrafficProject.features;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class ConvertDateFormat {
    public static String changeDateFormat(String date) throws ParseException {
        SimpleDateFormat inputFormat = new SimpleDateFormat("dd/MM/yyyy");

        // Parse the input date string into a Date object
        Date dateF = inputFormat.parse(date);

        // Output date format "yyyy-MM-dd"
        SimpleDateFormat outputFormat = new SimpleDateFormat("yyyy-MM-dd");
        String outputDateStr = outputFormat.format(dateF);
        return outputDateStr;
    }
}
