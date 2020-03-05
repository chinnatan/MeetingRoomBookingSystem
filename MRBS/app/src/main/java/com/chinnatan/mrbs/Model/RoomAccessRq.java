package com.chinnatan.mrbs.Model;

public class RoomAccessRq {
    private int bookingId;
    private int bookingPin;
    private int roomId;

    public RoomAccessRq(int bookingId, int bookingPin, int roomId) {
        this.bookingId = bookingId;
        this.bookingPin = bookingPin;
        this.roomId = roomId;
    }

    public int getBookingId() {
        return bookingId;
    }

    public void setBookingId(int bookingId) {
        this.bookingId = bookingId;
    }

    public int getBookingPin() {
        return bookingPin;
    }

    public void setBookingPin(int bookingPin) {
        this.bookingPin = bookingPin;
    }

    public int getRoomId() {
        return roomId;
    }

    public void setRoomId(int roomId) {
        this.roomId = roomId;
    }
}
