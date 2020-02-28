package com.chinnatan.mrbs.Model;

public class Room {
    private int rommId;
    private String roomName;

    public Room() {
    }

    public Room(int rommId, String roomName) {
        this.rommId = rommId;
        this.roomName = roomName;
    }

    public int getRommId() {
        return rommId;
    }

    public void setRommId(int rommId) {
        this.rommId = rommId;
    }

    public String getRoomName() {
        return roomName;
    }

    public void setRoomName(String roomName) {
        this.roomName = roomName;
    }
}
