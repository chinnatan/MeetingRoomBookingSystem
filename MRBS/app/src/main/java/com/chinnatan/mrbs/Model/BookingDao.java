package com.chinnatan.mrbs.Model;

import com.google.gson.annotations.SerializedName;

public class BookingDao {

    @SerializedName("BookingTitle")
    private String bookingTitle;
    @SerializedName("BookingStartDate")
    private String bookingStartDate;
    @SerializedName("BookingEndDate")
    private String bookingEndDate;
    @SerializedName("Fullname")
    private String fullname;
    @SerializedName("message")
    private String message;

    public String getBookingTitle() {
        return bookingTitle;
    }

    public String getBookingStartDate() {
        return bookingStartDate;
    }

    public String getBookingEndDate() {
        return bookingEndDate;
    }

    public String getFullname() {
        return fullname;
    }

    public String getMessage() {
        return message;
    }
}
