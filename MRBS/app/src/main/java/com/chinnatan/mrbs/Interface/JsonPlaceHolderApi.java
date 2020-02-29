package com.chinnatan.mrbs.Interface;

import com.chinnatan.mrbs.Model.BookingDao;
import com.chinnatan.mrbs.Model.RoomDao;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;

public interface JsonPlaceHolderApi {

    @GET("api/room/{roomid}/booking/now/")
    Call<List<BookingDao>> getBooking(@Path("roomid") int roomId);

    @GET("api/room/{roomid}/booking/time/now")
    Call<List<BookingDao>> getBookingCurrentTime(@Path("roomid") int roomId);

    @GET("api/room/all")
    Call<List<RoomDao>> getRoomName();
}
