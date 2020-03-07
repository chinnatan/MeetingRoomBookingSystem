package com.chinnatan.mrbs.Interface;

import com.chinnatan.mrbs.Model.BookingDao;
import com.chinnatan.mrbs.Model.RoomAccessRq;
import com.chinnatan.mrbs.Model.RoomAccessRs;
import com.chinnatan.mrbs.Model.RoomDao;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Path;

public interface JsonPlaceHolderApi {

    @GET("api/room/{roomid}/booking/now/")
    Call<List<BookingDao>> getBooking(@Path("roomid") int roomId);

    @GET("api/room/{roomid}/schedule/display")
    Call<List<BookingDao>> getBookingCurrentTime(@Path("roomid") int roomId);

    @GET("api/room/all")
    Call<List<RoomDao>> getRoomName();

    @POST("api/room/active")
    Call<RoomAccessRs> activeRoom(@Body RoomAccessRq body);
}
