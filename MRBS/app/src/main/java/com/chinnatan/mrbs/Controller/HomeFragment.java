package com.chinnatan.mrbs.Controller;

import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ListView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.chinnatan.mrbs.Controller.Adapter.BookingAdapter;
import com.chinnatan.mrbs.Interface.JsonPlaceHolderApi;
import com.chinnatan.mrbs.MainActivity;
import com.chinnatan.mrbs.Model.Booking;
import com.chinnatan.mrbs.Model.BookingDao;
import com.chinnatan.mrbs.R;
import com.github.nkzawa.emitter.Emitter;
import com.github.nkzawa.socketio.client.IO;
import com.github.nkzawa.socketio.client.Socket;

import java.net.URISyntaxException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.TimeZone;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

import static android.os.Looper.getMainLooper;

public class HomeFragment extends Fragment {

    private static final String TAG = "HOME";
    private static final int ROOMID = 5;

    private TextView currentTime;
    private TextView currentDate;
    private TextView message;
    private ListView bookingList;
    private ArrayList<Booking> bookingArrayList = new ArrayList<>();
    private BookingAdapter bookingAdapter;
    private JsonPlaceHolderApi JsonPlaceHolderApi;
    private Socket socketService;

    private Handler displayTime = new Handler(getMainLooper());

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_home, container, false);
    }

    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
        MainActivity.onFragmentChanged((TAG));

        init();
        displayTime();
        bookingAdapter = new BookingAdapter(getActivity(), R.layout.fragment_home_booking_item, bookingArrayList);
        bookingList.setAdapter(bookingAdapter);

        Retrofit retrofit = new Retrofit.Builder().baseUrl("http://192.168.1.2:4000/").addConverterFactory(GsonConverterFactory.create()).build();
        JsonPlaceHolderApi = retrofit.create(JsonPlaceHolderApi.class);
        getBooking();
    }

    private void init() {
        currentTime = getView().findViewById(R.id.home_currenttime);
        currentDate = getView().findViewById(R.id.home_currentdate);
        message = getView().findViewById(R.id.home_message);
        bookingList = getView().findViewById(R.id.home_booking_list);

        try {
            socketService = IO.socket("http://192.168.1.2:4001");
            socketService.on("triggerAddBooking", new Emitter.Listener() {
                @Override
                public void call(Object... args) {
                    Boolean triggerAddBooking = (Boolean) args[0];
                    if(triggerAddBooking) {
                        getBooking();
                    }
                }
            });
            socketService.connect();

        } catch (URISyntaxException e) {
            Log.e("SOCKET-SERVICE", e.getMessage());
        }
    }

    private void displayTime() {
        currentDate.setText(new SimpleDateFormat("dd/MM/YYYY", Locale.US).format(new Date()));
        displayTime.postDelayed(new Runnable() {
            @Override
            public void run() {
                currentTime.setText(new SimpleDateFormat("HH:mm:ss", Locale.US).format(new Date()));
                displayTime.postDelayed(this, 1000);
            }
        }, 10);
    }

    private void getBooking() {
        Call<List<BookingDao>> call = JsonPlaceHolderApi.getBooking(5);
        call.enqueue(new Callback<List<BookingDao>>() {
            @Override
            public void onResponse(Call<List<BookingDao>> call, Response<List<BookingDao>> response) {
                if (!response.isSuccessful()) {
                    message.setText("ไม่พบรายการการจองห้อง");
                    return;
                }

                SimpleDateFormat formatter = new SimpleDateFormat("HH:mm");
                List<BookingDao> bookingDaos = response.body();
                bookingArrayList.clear();

                for (BookingDao bookingDao : bookingDaos) {
                    Log.d("BOOKING", "bookingDaos");
                    Booking booking = new Booking();
                    booking.setBookingTitle(bookingDao.getBookingTitle());
                    try {
                        SimpleDateFormat isoDate = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
                        isoDate.setTimeZone(TimeZone.getTimeZone("UTC"));
                        Date startTime = isoDate.parse(bookingDao.getBookingStartDate());
                        Date endTime = isoDate.parse(bookingDao.getBookingEndDate());
                        booking.setBookingTime(formatter.format(startTime) + " - " + formatter.format(endTime));
                    } catch (ParseException e) {
                        e.printStackTrace();
                    }

                    bookingArrayList.add(booking);
                }
                bookingAdapter.notifyDataSetChanged();
                bookingList.setAdapter(bookingAdapter);
            }

            @Override
            public void onFailure(Call<List<BookingDao>> call, Throwable t) {
                Log.e("E", t.getMessage());
                message.setText("ไม่สามารถแสดงข้อมูลได้");
            }
        });
    }

    @Override
    public void onResume() {
        super.onResume();
        displayTime();
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        displayTime = null;
        socketService.disconnect();
    }
}
