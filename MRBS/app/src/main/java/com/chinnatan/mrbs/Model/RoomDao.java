package com.chinnatan.mrbs.Model;

import com.google.gson.annotations.SerializedName;

public class RoomDao {

    @SerializedName("RoomId")
    private int roomId;
    @SerializedName("RoomName")
    private String roomName;
    @SerializedName("RoomActive")
    private int roomActive;

    public int getRoomId() {
        return roomId;
    }

    public String getRoomName() {
        return roomName;
    }

    public int getRoomActive() {
        return roomActive;
    }
}
