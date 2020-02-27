package com.chinnatan.mrbs.Interface;

import com.chinnatan.mrbs.Model.BookingDao;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;

public interface JsonPlaceHolderApi {

    @GET("api/room/{roomid}/booking/now")
    Call<List<BookingDao>> getBooking(@Path("roomid") int roomId);
}
