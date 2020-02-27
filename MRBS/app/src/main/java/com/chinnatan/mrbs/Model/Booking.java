package com.chinnatan.mrbs.Model;

public class Booking {

    private int bookingId;
    private String bookingTitle;
    private String bookingTime;

    public Booking() {}

    public Booking(int bookingId, String bookingTitle, String bookingTime) {
        setBookingId(bookingId);
        setBookingTitle(bookingTitle);
        setBookingTime(bookingTime);
    }

    public int getBookingId() {
        return bookingId;
    }

    public void setBookingId(int bookingId) {
        this.bookingId = bookingId;
    }

    public String getBookingTitle() {
        return bookingTitle;
    }

    public void setBookingTitle(String bookingTitle) {
        this.bookingTitle = bookingTitle;
    }

    public String getBookingTime() {
        return bookingTime;
    }

    public void setBookingTime(String bookingTime) {
        this.bookingTime = bookingTime;
    }
}
