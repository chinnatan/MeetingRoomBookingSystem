package com.chinnatan.mrbs.Model;

public class BookingRs {

    private boolean isError = false;
    private String message;
    private String pin;

    public BookingRs() {
    }

    public BookingRs(boolean isError, String message, String pin) {
        this.isError = isError;
        this.message = message;
        this.pin = pin;
    }

    public boolean isError() {
        return isError;
    }

    public void setError(boolean error) {
        isError = error;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getPin() {
        return pin;
    }

    public void setPin(String pin) {
        this.pin = pin;
    }
}
