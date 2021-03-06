package com.chinnatan.mrbs.Controller;

import android.animation.ValueAnimator;
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
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.view.animation.LinearInterpolator;
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
import com.chinnatan.mrbs.Model.Room;
import com.chinnatan.mrbs.Model.RoomAccessRq;
import com.chinnatan.mrbs.Model.RoomAccessRs;
import com.chinnatan.mrbs.Model.RoomDao;
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
    private TextView homeTopicSlide;
    private ListView bookingList;
    private Button homeActiveBtn;
    private Button homeBookingBtn;

    private boolean isRoomActiveFlag = false;
    private int roomid;
    private int bookingid;
    private ArrayList<Booking> bookingArrayList = new ArrayList<>();
    private int tempBookingId = 0;
    private String tempTopicSlide;
    private int tempBeforeEndHours = -1;
    private int tempBeforeEndMin = -1;

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
        isRoomActive();
        getBooking(roomid);
        getBookingCurrentTime(roomid);
    }

    private void init() {
        initElement();
        initDisplayTime();
        initApiService();
        initAdapter();
        initElementListener();

        homeTopicSlide.setMaxEms(1000);
        final ValueAnimator animator = ValueAnimator.ofFloat(0.9f, -1.0f);
        animator.setRepeatCount(ValueAnimator.INFINITE);
        animator.setInterpolator(new LinearInterpolator());
        animator.setDuration(6000L);
        animator.addUpdateListener(new ValueAnimator.AnimatorUpdateListener() {
            @Override
            public void onAnimationUpdate(ValueAnimator animation) {
                final float progress = (float) animation.getAnimatedValue();
                final float width = homeTopicSlide.getWidth();
                final float translationX = width * progress;
                homeTopicSlide.setTranslationX(translationX);
            }
        });
        animator.start();

        myDB = getActivity().openOrCreateDatabase("my.db", Context.MODE_PRIVATE, null);
        Cursor cursor = myDB.rawQuery("select * from setting", null);
        if (cursor != null) {
            cursor.moveToFirst();
            roomid = cursor.getInt(1);
            homeRoomName.setText(cursor.getString(2));
        }

        try {
            socketService = IO.socket(MainActivity.URL_SOCKET);
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
            Log.e(TAG, e.getMessage());
        }

        try {
            socketNodeMCUService = IO.socket(MainActivity.URL_SOCKETMCU);
            socketNodeMCUService.on("sendRoomIdToApplication", new Emitter.Listener() {
                @Override
                public void call(Object... args) {
                    int socketRoomId = (int) args[0];
                    if (roomid == socketRoomId) {
                        saveEndDate(bookingid);
                    }
                }
            });

            socketNodeMCUService.connect();
        } catch (URISyntaxException e) {
            Log.e(TAG, e.getMessage());
        }
    }

    private void initElement() {
        currentTime = getView().findViewById(R.id.home_currenttime);
        currentDate = getView().findViewById(R.id.home_currentdate);
        message = getView().findViewById(R.id.home_message);
        bookingList = getView().findViewById(R.id.home_booking_list);
        homeRoomName = getView().findViewById(R.id.home_roomname);
        homeStatus = getView().findViewById(R.id.home_status);
        homeTopicSlide = getView().findViewById(R.id.home_topic_slide);
        homeHeader = getView().findViewById(R.id.home_header);
        homeActiveBtn = getView().findViewById(R.id.home_active_btn);
        homeBookingBtn = getView().findViewById(R.id.home_booking_btn);

        message.setTextSize(22);
    }

    private void initDisplayTime() {
        currentDate.setText(new SimpleDateFormat("dd/MM/YYYY", Locale.US).format(new Date()));
        displayTimeRunnable = new Runnable() {
            @Override
            public void run() {
                currentTime.setText(new SimpleDateFormat("HH:mm:ss", Locale.US).format(new Date()));
                int currentHours = Integer.parseInt(String.format("%02d", new Date().getHours()));
                int currentMin = Integer.parseInt(String.format("%02d", new Date().getMinutes()));
                Log.d(TAG, "END HOURS : " + tempBeforeEndHours + " END MIN : " + tempBeforeEndMin);
                if (bookingArrayList.size() > 0) {
                    int nextHours = Integer.parseInt(bookingArrayList.get(0).getBookingTime().substring(0, 2));
                    int nextMin = Integer.parseInt(bookingArrayList.get(0).getBookingTime().substring(3, 5));

                    Log.d(TAG, "CURRENT HOURS : " + currentHours + " CURRENT MIN : " + currentMin);
                    Log.d(TAG, "NEXT HOURS : " + nextHours + " NEXT MIN : " + nextMin);

                    if (currentHours >= nextHours && currentMin >= nextMin) {
                        getBookingCurrentTime(roomid);
                        getBooking(roomid);
                    } else if ((tempBeforeEndHours != -1 && tempBeforeEndMin != -1) && (currentHours >= tempBeforeEndHours && currentMin >= tempBeforeEndMin)) {
                        getBookingCurrentTime(roomid);
                        getBooking(roomid);
                    }
                } else {
                    if ((tempBeforeEndHours != -1 && tempBeforeEndMin != -1) && (currentHours >= tempBeforeEndHours && currentMin >= tempBeforeEndMin)) {
                        getBookingCurrentTime(roomid);
                        getBooking(roomid);
                    }
                }
                displayTime.postDelayed(displayTimeRunnable, 1000);
            }
        };
        displayTime.postDelayed(displayTimeRunnable, 10);
    }

    private void initApiService() {
        OkHttpClient httpClient = new OkHttpClient.Builder().retryOnConnectionFailure(true).readTimeout(30, TimeUnit.SECONDS).writeTimeout(30, TimeUnit.SECONDS).connectTimeout(10, TimeUnit.SECONDS).build();
        Retrofit retrofit = new Retrofit.Builder().client(httpClient).baseUrl(MainActivity.URL_API).addConverterFactory(GsonConverterFactory.create()).build();
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
                    connectSuccess();
                    message.setVisibility(View.VISIBLE);
                    message.setText("ไม่พบข้อมูลการจอง");
                    bookingArrayList.clear();
                    bookingAdapter.notifyDataSetChanged();
                    bookingList.setAdapter(bookingAdapter);
                    if (MainActivity.stateFragmentName.equals(TAG) && isRoomActiveFlag) {
                        call.clone().enqueue(this);
                    }
                    return;
                }

                connectSuccess();
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
                    message.setVisibility(View.VISIBLE);
                    message.setText("ไม่พบข้อมูลการจอง");
                }

//                if (MainActivity.stateFragmentName.equals(TAG) && isRoomActiveFlag) {
//                    call.clone().enqueue(this);
//                }
            }

            @Override
            public void onFailure(Call<List<BookingDao>> call, Throwable t) {
                Log.e(TAG, "getBooking : " + t.getLocalizedMessage());
                if (MainActivity.stateFragmentName.equals(TAG) && isRoomActiveFlag) {
                    call.clone().enqueue(this);
                    connectFailed();
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

                connectSuccess();

                List<BookingDao> bookingDaos = response.body();

                if (bookingDaos.size() > 0 && bookingDaos.get(0).getMessage() == null) {
                    homeHeader.setBackgroundColor(ContextCompat.getColor(getContext(), R.color.colorNoAvaliable));
                    homeActiveBtn.setVisibility(View.VISIBLE);
                    homeStatus.setText("ไม่พร้อม");
                    bookingid = bookingDaos.get(0).getBookingId();
                    homeTopicSlide.setText(bookingDaos.get(0).getBookingTitle() + " | กำลังใช้งาน");

                    SimpleDateFormat formatter = new SimpleDateFormat("HH:mm");
                    SimpleDateFormat isoDate = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
                    isoDate.setTimeZone(TimeZone.getTimeZone("UTC"));
                    try {
                        Booking booking = new Booking();
                        Date nowStartDate = isoDate.parse(bookingDaos.get(0).getBookingStartDate());
                        Date nowEndDate = isoDate.parse(bookingDaos.get(0).getBookingEndDate());
                        booking.setBookingTime(formatter.format(nowStartDate) + " - " + formatter.format(nowEndDate));
                        tempBeforeEndHours = Integer.parseInt(booking.getBookingTime().substring(8, 10));
                        tempBeforeEndMin = Integer.parseInt(booking.getBookingTime().substring(11, 13));
                    } catch (ParseException e) {
                        e.printStackTrace();
                    }
                } else {
                    homeHeader.setBackgroundColor(ContextCompat.getColor(getContext(), R.color.colorAvaliable));
                    homeActiveBtn.setVisibility(View.INVISIBLE);
                    homeStatus.setText("พร้อม");
                    bookingid = 0;
                    homeTopicSlide.setText(null);
                    tempBeforeEndHours = -1;
                    tempBeforeEndMin = -1;
                }

//                if (MainActivity.stateFragmentName.equals(TAG) && isRoomActiveFlag) {
//                    call.clone().enqueue(this);
//                }
            }

            @Override
            public void onFailure(Call<List<BookingDao>> call, Throwable t) {
                Log.e(TAG, "getBookingCurrentTime : " + t.getMessage());
                if (MainActivity.stateFragmentName.equals(TAG) && isRoomActiveFlag) {
                    call.clone().enqueue(this);
                    connectFailed();
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
                    if (roomAccessRs.getMessage().equals("ยืนยันสำเร็จ")) {
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
                Toast.makeText(getContext(), "กรุณาลองใหม่อีกครั้ง", Toast.LENGTH_LONG).show();
            }
        });
    }

    private void isRoomActive() {
        Call<List<RoomDao>> call = JsonPlaceHolderApi.getRoomName();
        call.enqueue(new Callback<List<RoomDao>>() {
            @Override
            public void onResponse(Call<List<RoomDao>> call, Response<List<RoomDao>> response) {
                if (!response.isSuccessful()) {
//                    if (MainActivity.stateFragmentName.equals(TAG)) {
//                        call.clone().enqueue(this);
//                        isRoomActiveFlag = false;
//                        connectFailed();
//                    }
                    return;
                }

                List<RoomDao> roomDaos = response.body();

                for (RoomDao roomDao : roomDaos) {
                    if (roomDao.getRoomId() == roomid && roomDao.getRoomActive() == 0) {
                        homeHeader.setBackgroundColor(ContextCompat.getColor(getContext(), R.color.colorWarning));
                        homeActiveBtn.setVisibility(View.INVISIBLE);
                        homeStatus.setVisibility(View.INVISIBLE);
                        homeTopicSlide.setVisibility(View.INVISIBLE);
                        message.setTextSize(24);
                        message.setText("ห้องนี้ถูกปิดใช้งาน");
                        homeBookingBtn.setVisibility(View.INVISIBLE);
                        isRoomActiveFlag = false;
                    } else if (roomDao.getRoomId() == roomid && roomDao.getRoomActive() == 1) {
                        isRoomActiveFlag = true;
                    }
                }

//                if (MainActivity.stateFragmentName.equals(TAG)) {
//                    call.clone().enqueue(this);
//                }
            }

            @Override
            public void onFailure(Call<List<RoomDao>> call, Throwable t) {
                Log.e(TAG, "isRoomActive : " + t.getMessage());
                if (MainActivity.stateFragmentName.equals(TAG)) {
                    call.clone().enqueue(this);
                    isRoomActiveFlag = false;
                    connectFailed();
                }
            }
        });
    }

    private void saveEndDate(int bookingId) {
        Call<MessageRs> call = JsonPlaceHolderApi.saveEndDate(new DoorOpenRq(bookingId));
        call.enqueue(new Callback<MessageRs>() {
            @Override
            public void onResponse(Call<MessageRs> call, Response<MessageRs> response) {
                if (!response.isSuccessful()) {
                    return;
                }

                MessageRs messageRs = response.body();
                if (messageRs.isMessage()) {
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

    private void connectSuccess() {
        homeStatus.setVisibility(View.VISIBLE);
        homeTopicSlide.setVisibility(View.VISIBLE);
        homeBookingBtn.setVisibility(View.VISIBLE);
    }

    private void connectFailed() {
        homeHeader.setBackgroundColor(ContextCompat.getColor(getContext(), R.color.colorWarning));
        homeActiveBtn.setVisibility(View.INVISIBLE);
        homeStatus.setVisibility(View.INVISIBLE);
        homeTopicSlide.setVisibility(View.INVISIBLE);
        message.setTextSize(22);
        message.setText("ไม่สามารถเชื่อมต่อระบบได้");
        homeBookingBtn.setVisibility(View.INVISIBLE);
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
