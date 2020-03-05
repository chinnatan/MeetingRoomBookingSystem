package com.chinnatan.mrbs.Model;

public class RoomAccessRs {
    private String errorMesage = null;
    private String message = null;

    public RoomAccessRs(String errorMesage, String message) {
        this.errorMesage = errorMesage;
        this.message = message;
    }

    public String getErrorMesage() {
        return errorMesage;
    }

    public void setErrorMesage(String errorMesage) {
        this.errorMesage = errorMesage;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
