package com.chinnatan.mrbs.Model;

public class DoorOpenRq {
    private int bookingId;

    public DoorOpenRq(int bookingId) {
        this.bookingId = bookingId;
    }

    public int getBookingId() {
        return bookingId;
    }

    public void setBookingId(int bookingId) {
        this.bookingId = bookingId;
    }
}
