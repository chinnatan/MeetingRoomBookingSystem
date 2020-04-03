package com.chinnatan.mrbs.Model;

public class BookingRq {
    private boolean isApplication;
    private String BookingTitle;
    private String BookingDetail;
    private String BookingStartDate;
    private String BookingStartTime;
    private String BookingEndTime;
    private String BookingAttendees;
    private String UserId;
    private int RoomId;

    public BookingRq() {
    }

    public BookingRq(boolean isApplication, String bookingTitle, String bookingDetail, String bookingStartDate, String bookingStartTime, String bookingEndTime, String bookingAttendees, String userId, int roomId) {
        this.isApplication = isApplication;
        BookingTitle = bookingTitle;
        BookingDetail = bookingDetail;
        BookingStartDate = bookingStartDate;
        BookingStartTime = bookingStartTime;
        BookingEndTime = bookingEndTime;
        BookingAttendees = bookingAttendees;
        UserId = userId;
        RoomId = roomId;
    }

    public boolean isApplication() {
        return isApplication;
    }

    public void setApplication(boolean application) {
        isApplication = application;
    }

    public String getBookingTitle() {
        return BookingTitle;
    }

    public void setBookingTitle(String bookingTitle) {
        BookingTitle = bookingTitle;
    }

    public String getBookingDetail() {
        return BookingDetail;
    }

    public void setBookingDetail(String bookingDetail) {
        BookingDetail = bookingDetail;
    }

    public String getBookingStartDate() {
        return BookingStartDate;
    }

    public void setBookingStartDate(String bookingStartDate) {
        BookingStartDate = bookingStartDate;
    }

    public String getBookingStartTime() {
        return BookingStartTime;
    }

    public void setBookingStartTime(String bookingStartTime) {
        BookingStartTime = bookingStartTime;
    }

    public String getBookingEndTime() {
        return BookingEndTime;
    }

    public void setBookingEndTime(String bookingEndTime) {
        BookingEndTime = bookingEndTime;
    }

    public String getBookingAttendees() {
        return BookingAttendees;
    }

    public void setBookingAttendees(String bookingAttendees) {
        BookingAttendees = bookingAttendees;
    }

    public String getUserId() {
        return UserId;
    }

    public void setUserId(String userId) {
        UserId = userId;
    }

    public int getRoomId() {
        return RoomId;
    }

    public void setRoomId(int roomId) {
        RoomId = roomId;
    }
}
