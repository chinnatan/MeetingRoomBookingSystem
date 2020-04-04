package com.chinnatan.mrbs.Controller;

import android.content.ContentValues;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Entity;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;
import android.os.Handler;
import android.text.InputFilter;
import android.text.InputType;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AlertDialog;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.core.content.ContextCompat;
import androidx.fragment.app.Fragment;

import com.chinnatan.mrbs.Controller.Adapter.BookingAdapter;
import com.chinnatan.mrbs.Interface.JsonPlaceHolderApi;
import com.chinnatan.mrbs.MainActivity;
import com.chinnatan.mrbs.Model.Booking;
import com.chinnatan.mrbs.Model.BookingDao;
import com.chinnatan.mrbs.Model.DoorOpenRq;
import com.chinnatan.mrbs.Model.DoorOpenRs;
import com.chinnatan.mrbs.Model.MessageRs;
import com.chinnatan.mrbs.Model.RoomAccessRq;
import com.chinnatan.mrbs.Model.RoomAccessRs;
import com.chinnatan.mrbs.R;
import com.github.nkzawa.emitter.Emitter;
import com.github.nkzawa.socketio.client.IO;
import com.github.nkzawa.socketio.client.Socket;
import com.google.gson.Gson;

import java.net.URISyntaxException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.TimeZone;
import java.util.concurrent.TimeUnit;

import okhttp3.Interceptor;
import okhttp3.OkHttpClient;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

import static android.os.Looper.getMainLooper;

public class HomeFragment extends Fragment {

    private static final String TAG = "HOME";

    private ConstraintLayout homeHeader;
    private TextView currentTime;
    private TextView currentDate;
    private TextView message;
    private TextView homeRoomName;
    private TextView homeStatus;
    private ListView bookingList;
    private Button homeActiveBtn;
    private Button homeBookingBtn;

    private int roomid;
    private int bookingid;
    private ArrayList<Booking> bookingArrayList = new ArrayList<>();

    private BookingAdapter bookingAdapter;
    private JsonPlaceHolderApi JsonPlaceHolderApi;
    private Socket socketService;
    private Socket socketNodeMCUService;
    private SQLiteDatabase myDB;

    private Handler displayTime = new Handler(getMainLooper());
    private Runnable displayTimeRunnable;

    private Call<List<BookingDao>> callBooking;
    private Call<List<BookingDao>> callBookingCurrentTime;

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
        getBooking(roomid);
        getBookingCurrentTime(roomid);
    }

    private void init() {
        initElement();
        initDisplayTime();
        initApiService();
        initAdapter();
        initElementListener();

        myDB = getActivity().openOrCreateDatabase("my.db", Context.MODE_PRIVATE, null);
        Cursor cursor = myDB.rawQuery("select * from setting", null);
        if (cursor != null) {
            cursor.moveToFirst();
            roomid = cursor.getInt(1);
            homeRoomName.setText(cursor.getString(2));
        }

        try {
            socketService = IO.socket("http://192.168.1.2:4001");
            socketService.on("triggerAddBooking", new Emitter.Listener() {
                @Override
                public void call(Object... args) {
                    Boolean triggerAddBooking = (Boolean) args[0];
                    if (triggerAddBooking) {
                        getBooking(roomid);
                    }
                }
            });

            socketService.connect();
        } catch (URISyntaxException e) {
            Log.e("SOCKET-SERVICE", e.getMessage());
        }

        try {
            socketNodeMCUService = IO.socket("http://192.168.1.2:4002");
            socketNodeMCUService.on("sendRoomIdToApplication", new Emitter.Listener() {
                @Override
                public void call(Object... args) {
                    int socketRoomId = (int) args[0];
                    if(roomid == socketRoomId) {
                        saveEndDate(bookingid);
                    }
                }
            });

            socketNodeMCUService.connect();
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
    }

    private void initElement() {
        currentTime = getView().findViewById(R.id.home_currenttime);
        currentDate = getView().findViewById(R.id.home_currentdate);
        message = getView().findViewById(R.id.home_message);
        bookingList = getView().findViewById(R.id.home_booking_list);
        homeRoomName = getView().findViewById(R.id.home_roomname);
        homeStatus = getView().findViewById(R.id.home_status);
        homeHeader = getView().findViewById(R.id.home_header);
        homeActiveBtn = getView().findViewById(R.id.home_active_btn);
        homeBookingBtn = getView().findViewById(R.id.home_booking_btn);
    }

    private void initDisplayTime() {
        currentDate.setText(new SimpleDateFormat("dd/MM/YYYY", Locale.US).format(new Date()));
        displayTimeRunnable = new Runnable() {
            @Override
            public void run() {
                currentTime.setText(new SimpleDateFormat("HH:mm:ss", Locale.US).format(new Date()));
                displayTime.postDelayed(displayTimeRunnable, 1000);
            }
        };
        displayTime.postDelayed(displayTimeRunnable, 10);
    }

    private void initApiService() {
        OkHttpClient httpClient = new OkHttpClient.Builder().retryOnConnectionFailure(true).readTimeout(8, TimeUnit.SECONDS).writeTimeout(8, TimeUnit.SECONDS).connectTimeout(5, TimeUnit.SECONDS).build();
        Retrofit retrofit = new Retrofit.Builder().client(httpClient).baseUrl("http://192.168.1.2:4000/").addConverterFactory(GsonConverterFactory.create()).build();
        JsonPlaceHolderApi = retrofit.create(JsonPlaceHolderApi.class);
    }

    private void initAdapter() {
        bookingAdapter = new BookingAdapter(getActivity(), R.layout.fragment_home_booking_item, bookingArrayList);
        bookingList.setAdapter(bookingAdapter);
    }

    private void initElementListener() {
        homeActiveBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                displayInputPasswordDialog(bookingid);
            }
        });

        homeBookingBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                getActivity().getSupportFragmentManager().beginTransaction().replace(R.id.main_view, new BookingFragment()).addToBackStack(null).commit();
            }
        });
    }

    private void getBooking(int roomid) {
        callBooking = JsonPlaceHolderApi.getBooking(roomid);
        callBooking.enqueue(new Callback<List<BookingDao>>() {
            @Override
            public void onResponse(Call<List<BookingDao>> call, Response<List<BookingDao>> response) {
                if (!response.isSuccessful()) {
                    message.setText("ไม่พบข้อมูลการจอง");
                    bookingArrayList.clear();
                    bookingAdapter.notifyDataSetChanged();
                    bookingList.setAdapter(bookingAdapter);
                    call.clone().enqueue(this);
                    return;
                }

                message.setVisibility(View.INVISIBLE);
                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
                SimpleDateFormat formatter = new SimpleDateFormat("HH:mm");
                List<BookingDao> bookingDaos = response.body();
                bookingArrayList.clear();

                for (BookingDao bookingDao : bookingDaos) {
                    SimpleDateFormat isoDate = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
                    isoDate.setTimeZone(TimeZone.getTimeZone("UTC"));
                    try {
                        Booking booking = new Booking();
                        Date dateCompare = isoDate.parse(bookingDao.getBookingStartDate());
                        Date currentDate = new Date();
                        if (dateFormat.format(dateCompare).equals(dateFormat.format(currentDate))) {
                            booking.setBookingTitle(bookingDao.getBookingTitle());
                            Date startTime = isoDate.parse(bookingDao.getBookingStartDate());
                            Date endTime = isoDate.parse(bookingDao.getBookingEndDate());
                            booking.setBookingTime(formatter.format(startTime) + " - " + formatter.format(endTime));
                            bookingArrayList.add(booking);
                        }
                    } catch (ParseException e) {
                        e.printStackTrace();
                    }
                }

                if (bookingArrayList.size() > 0) {
                    bookingAdapter.notifyDataSetChanged();
                    bookingList.setAdapter(bookingAdapter);
                } else {
                    message.setText("ไม่พบข้อมูลการจอง");
                }

                if(MainActivity.stateFragmentName.equals(TAG)) {
                    call.clone().enqueue(this);
                }
            }

            @Override
            public void onFailure(Call<List<BookingDao>> call, Throwable t) {
                Log.e(TAG, "getBooking : " + t.getLocalizedMessage());
                if(MainActivity.stateFragmentName.equals(TAG)) {
                    call.clone().enqueue(this);
                }
            }
        });
    }

    private void getBookingCurrentTime(final int roomid) {
        callBookingCurrentTime = JsonPlaceHolderApi.getBookingCurrentTime(roomid);
        callBookingCurrentTime.enqueue(new Callback<List<BookingDao>>() {
            @Override
            public void onResponse(Call<List<BookingDao>> call, Response<List<BookingDao>> response) {
                if (!response.isSuccessful()) {
                    return;
                }

                List<BookingDao> bookingDaos = response.body();
                if (bookingDaos.size() > 0 && bookingDaos.get(0).getMessage() == null) {
                    Log.d(TAG, "NO AVALIABLE");
                    homeHeader.setBackgroundColor(ContextCompat.getColor(getContext(), R.color.colorNoAvaliable));
                    homeActiveBtn.setVisibility(View.VISIBLE);
                    homeStatus.setText("ไม่พร้อม");
                    bookingid = bookingDaos.get(0).getBookingId();
                } else {
                    Log.d(TAG, "AVALIABLE");
                    homeHeader.setBackgroundColor(ContextCompat.getColor(getContext(), R.color.colorAvaliable));
                    homeActiveBtn.setVisibility(View.INVISIBLE);
                    homeStatus.setText("พร้อม");
                    bookingid = 0;
                }

                if(MainActivity.stateFragmentName.equals(TAG)) {
                    call.clone().enqueue(this);
                }
            }

            @Override
            public void onFailure(Call<List<BookingDao>> call, Throwable t) {
                Log.e(TAG, "getBookingCurrentTime : " + t.getMessage());
                if(MainActivity.stateFragmentName.equals(TAG)) {
                    call.clone().enqueue(this);
                }
            }
        });
    }

    private void activeRoom(int bookingPin) {
        Log.d(TAG, "BOOKING ID : " + String.valueOf(bookingid) + " ROOM ID : " + String.valueOf(roomid));
        Call<RoomAccessRs> call = JsonPlaceHolderApi.activeRoom(new RoomAccessRq(bookingid, bookingPin, roomid));
        call.enqueue(new Callback<RoomAccessRs>() {
            @Override
            public void onResponse(Call<RoomAccessRs> call, Response<RoomAccessRs> response) {
                if (!response.isSuccessful()) {
                    return;
                }

                RoomAccessRs roomAccessRs = response.body();
                if (roomAccessRs.getErrorMesage() != null && roomAccessRs.getMessage() == null) {
                    Toast.makeText(getContext(), roomAccessRs.getErrorMesage(), Toast.LENGTH_LONG).show();
                } else {
                    if(roomAccessRs.getMessage().equals("ยืนยันสำเร็จ")) {
                        ContentValues contentValues = new ContentValues();
                        contentValues.put("RoomId", roomid);
                        contentValues.put("isOpen", true);
                        Gson gson = new Gson();
                        socketNodeMCUService.emit("triggerOpenDoor", gson.toJson(contentValues));
                        Toast.makeText(getContext(), roomAccessRs.getMessage(), Toast.LENGTH_LONG).show();
                    } else {
                        Toast.makeText(getContext(), roomAccessRs.getMessage(), Toast.LENGTH_LONG).show();
                    }
                }
            }

            @Override
            public void onFailure(Call<RoomAccessRs> call, Throwable t) {
                Log.e(TAG, t.getMessage());
                call.clone().enqueue(this);
            }
        });
    }

    private void checkRoomAccess(int bookingId) {
        Call<DoorOpenRs> call = JsonPlaceHolderApi.checkActiveRoom(new DoorOpenRq(bookingId));
        call.enqueue(new Callback<DoorOpenRs>() {
            @Override
            public void onResponse(Call<DoorOpenRs> call, Response<DoorOpenRs> response) {
                if(!response.isSuccessful()) {
                    return;
                }

                DoorOpenRs doorOpenRs = response.body();
                if(doorOpenRs.isOpen()) {
                    ContentValues contentValues = new ContentValues();
                    contentValues.put("RoomId", roomid);
                    contentValues.put("isOpen", true);
                    Gson gson = new Gson();
                    socketNodeMCUService.emit("triggerOpenDoor", gson.toJson(contentValues));
                } else {
                    displayInputPasswordDialog(bookingid);
                }
            }

            @Override
            public void onFailure(Call<DoorOpenRs> call, Throwable t) {
                call.clone().enqueue(this);
            }
        });
    }

    private void saveEndDate(int bookingId) {
        Call<MessageRs> call = JsonPlaceHolderApi.saveEndDate(new DoorOpenRq(bookingId));
        call.enqueue(new Callback<MessageRs>() {
            @Override
            public void onResponse(Call<MessageRs> call, Response<MessageRs> response) {
                if(!response.isSuccessful()) {
                    return;
                }

                MessageRs messageRs = response.body();
                if(messageRs.isMessage()) {
                    Log.d(TAG, "SAVE END DATE : SUCCESS");
                } else {
                    Log.d(TAG, "SAVE END DATE : NOT SUCCESS");
                }
            }

            @Override
            public void onFailure(Call<MessageRs> call, Throwable t) {
                call.clone().enqueue(this);
            }
        });
    }

    private void displayInputPasswordDialog(int bookingId) {
        AlertDialog.Builder builder = new AlertDialog.Builder(getContext());
        builder.setTitle("กรอกรหัสผ่าน");

        final EditText input = new EditText(getContext());

        input.setFilters(new InputFilter[]{new InputFilter.LengthFilter(6)});
        input.setInputType(InputType.TYPE_CLASS_NUMBER | InputType.TYPE_NUMBER_VARIATION_PASSWORD);
        builder.setView(input);

        builder.setPositiveButton("ตกลง", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                if (input.getText().toString().equals("") || input.getText().toString().equals(null)) {
                    Toast.makeText(getContext(), "กรุณากรอกรหัสผ่าน", Toast.LENGTH_LONG).show();
                } else {
                    activeRoom(Integer.parseInt(input.getText().toString()));
                }
                getBooking(roomid);
            }
        });
        builder.setNegativeButton("ยกเลิก", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                dialog.cancel();
            }
        });

        builder.show();
    }

    @Override
    public void onResume() {
        super.onResume();
        initDisplayTime();
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        displayTime = null;
        socketService.disconnect();
        socketNodeMCUService.disconnect();
    }
}
