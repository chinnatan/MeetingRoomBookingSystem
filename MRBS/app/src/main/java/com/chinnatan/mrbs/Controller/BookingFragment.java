package com.chinnatan.mrbs.Controller;

import android.app.DatePickerDialog;
import android.app.TimePickerDialog;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;
import android.text.InputType;
import android.util.Log;
import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.TimePicker;
import android.widget.Toast;
import android.widget.Toolbar;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.chinnatan.mrbs.Interface.JsonPlaceHolderApi;
import com.chinnatan.mrbs.MainActivity;
import com.chinnatan.mrbs.Model.BookingRq;
import com.chinnatan.mrbs.Model.BookingRs;
import com.chinnatan.mrbs.R;

import java.util.Calendar;
import java.util.Objects;
import java.util.concurrent.TimeUnit;

import okhttp3.OkHttpClient;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class BookingFragment extends Fragment {

    private static final String TAG = "BOOKING";
    private final String title = "จองห้อง";

    private Toolbar bookingToolBar;
    private EditText bookingUser;
    private EditText bookingTitle;
    private EditText bookingDetail;
    private EditText bookingAttendees;
    private EditText bookingDate;
    private EditText bookingStartTime;
    private EditText bookingEndTime;
    private Button bookingSubmit;

    private DatePickerDialog picker;
    private TimePickerDialog startTimePicker;
    private TimePickerDialog endTimePicker;

    private String strBookingUser;
    private String strBookingTitle;
    private String strBookingDetail;
    private String strBookingAttendees;
    private String strBookingDate;
    private String strBookingStartTime;
    private String strBookingEndTime;
    private int intBookingRoomId;

    private JsonPlaceHolderApi JsonPlaceHolderApi;
    private SQLiteDatabase myDB;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_booking, container, false);
    }

    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
        MainActivity.onFragmentChanged((TAG));

        init();
    }

    private void init() {
        initElement();
        initElementListener();
        initApiService();
        createToolBar();

        myDB = getActivity().openOrCreateDatabase("my.db", Context.MODE_PRIVATE, null);
        Cursor cursor = myDB.rawQuery("select * from setting", null);
        if (cursor != null) {
            cursor.moveToFirst();
            intBookingRoomId = cursor.getInt(1);
        }
    }

    private void initElement() {
        bookingToolBar = getView().findViewById(R.id.booking_toolbar);
        bookingUser = getView().findViewById(R.id.booking_user);
        bookingTitle = getView().findViewById(R.id.booking_title);
        bookingDetail = getView().findViewById(R.id.booking_detail);
        bookingAttendees = getView().findViewById(R.id.booking_attendees);
        bookingDate = getView().findViewById(R.id.booking_date);
        bookingStartTime = getView().findViewById(R.id.booking_start_time);
        bookingEndTime = getView().findViewById(R.id.booking_end_time);
        bookingSubmit = getView().findViewById(R.id.booking_submit_btn);
    }

    private void initElementListener() {
        bookingDate.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View v, MotionEvent event) {
                if(event.getAction() == MotionEvent.ACTION_UP){
                    final Calendar cldr = Calendar.getInstance();
                    int day = cldr.get(Calendar.DAY_OF_MONTH);
                    int month = cldr.get(Calendar.MONTH);
                    int year = cldr.get(Calendar.YEAR);
                    // date picker dialog
                    picker = new DatePickerDialog(getActivity(),
                            new DatePickerDialog.OnDateSetListener() {
                                @Override
                                public void onDateSet(DatePicker view, int year, int monthOfYear, int dayOfMonth) {
                                    bookingDate.setText(dayOfMonth + "/" + (monthOfYear + 1) + "/" + year);
                                    strBookingDate = year + "-" + (monthOfYear + 1) + "-" + dayOfMonth;
                                }
                            }, year, month, day);
                    picker.show();
                    return true;
                }
                return false;
            }
        });

        bookingStartTime.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View v, MotionEvent event) {
                if(event.getAction() == MotionEvent.ACTION_UP) {
                    final Calendar cldr = Calendar.getInstance();
                    int hour = cldr.get(Calendar.HOUR_OF_DAY);
                    int minutes = cldr.get(Calendar.MINUTE);
                    // time picker dialog
                    startTimePicker = new TimePickerDialog(getActivity(),
                            new TimePickerDialog.OnTimeSetListener() {
                                @Override
                                public void onTimeSet(TimePicker tp, int sHour, int sMinute) {
                                    bookingStartTime.setText(sHour + ":" + sMinute);
                                }
                            }, hour, minutes, true);
                    startTimePicker.show();
                    return true;
                }
                return false;
            }
        });

        bookingEndTime.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View v, MotionEvent event) {
                if(event.getAction() == MotionEvent.ACTION_UP) {
                    final Calendar cldr = Calendar.getInstance();
                    int hour = cldr.get(Calendar.HOUR_OF_DAY);
                    int minutes = cldr.get(Calendar.MINUTE);
                    // time picker dialog
                    endTimePicker = new TimePickerDialog(getActivity(),
                            new TimePickerDialog.OnTimeSetListener() {
                                @Override
                                public void onTimeSet(TimePicker tp, int sHour, int sMinute) {
                                    bookingEndTime.setText(sHour + ":" + sMinute);
                                }
                            }, hour, minutes, true);
                    endTimePicker.show();
                    return true;
                }
                return false;
            }
        });

        bookingSubmit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                strBookingUser = String.valueOf(bookingUser.getText());
                strBookingTitle = String.valueOf(bookingTitle.getText());
                strBookingDetail = String.valueOf(bookingDetail.getText());
                strBookingStartTime = String.valueOf(bookingStartTime.getText());
                strBookingEndTime = String.valueOf(bookingEndTime.getText());
                strBookingAttendees = String.valueOf(bookingAttendees.getText());

                if (strBookingUser.equals("") || strBookingTitle.equals("") || strBookingDetail.equals("") || strBookingDate.equals("") || strBookingStartTime.equals("") || strBookingEndTime.equals("") || strBookingAttendees.equals("")) {
                    Toast.makeText(getContext(), "กรุณากรอกข้อมูลให้ครบถ้วน", Toast.LENGTH_LONG).show();
                } else {
                    Call<BookingRs> call = JsonPlaceHolderApi.sendBooking(new BookingRq(true, strBookingTitle, strBookingDetail, strBookingDate, strBookingStartTime, strBookingEndTime, strBookingAttendees, strBookingUser, intBookingRoomId));
                    call.enqueue(new Callback<BookingRs>() {
                        @Override
                        public void onResponse(Call<BookingRs> call, Response<BookingRs> response) {
                            if (!response.isSuccessful()) {
                                Toast.makeText(getContext(), "เกิดข้อผิดพลาดของระบบ", Toast.LENGTH_LONG).show();
                                return;
                            }

                            BookingRs bookingRs = response.body();
                            if (bookingRs.isError()) {
                                Toast.makeText(getContext(), bookingRs.getMessage(), Toast.LENGTH_LONG).show();
                            } else {
                                Toast.makeText(getContext(), bookingRs.getMessage() + "รหัสสำหรับเข้าใช้งาน : " + bookingRs.getPin(), Toast.LENGTH_LONG).show();
                            }
                        }

                        @Override
                        public void onFailure(Call<BookingRs> call, Throwable t) {
                            Toast.makeText(getContext(), "เกิดข้อผิดพลาดของระบบ", Toast.LENGTH_LONG).show();
                        }
                    });
                }
            }
        });
    }

    private void initApiService() {
        OkHttpClient httpClient = new OkHttpClient.Builder().retryOnConnectionFailure(true).readTimeout(8, TimeUnit.SECONDS).writeTimeout(8, TimeUnit.SECONDS).connectTimeout(5, TimeUnit.SECONDS).build();
        Retrofit retrofit = new Retrofit.Builder().client(httpClient).baseUrl("http://192.168.1.2:4000/").addConverterFactory(GsonConverterFactory.create()).build();
        JsonPlaceHolderApi = retrofit.create(JsonPlaceHolderApi.class);
    }

    private void createToolBar() {
        Objects.requireNonNull(getActivity()).setActionBar(bookingToolBar);
        bookingToolBar.setTitle(title);
        bookingToolBar.setNavigationIcon(R.drawable.ic_action_name);
        bookingToolBar.setNavigationContentDescription("Back");
        bookingToolBar.setNavigationOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                getActivity().onBackPressed();
            }
        });
    }
}
