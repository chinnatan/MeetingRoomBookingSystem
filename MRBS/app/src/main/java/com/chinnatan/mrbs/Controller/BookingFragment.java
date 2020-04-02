package com.chinnatan.mrbs.Controller;

import android.app.DatePickerDialog;
import android.app.TimePickerDialog;
import android.os.Bundle;
import android.text.InputType;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.TimePicker;
import android.widget.Toolbar;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.chinnatan.mrbs.MainActivity;
import com.chinnatan.mrbs.R;

import java.util.Calendar;
import java.util.Objects;

public class BookingFragment extends Fragment {

    private static final String TAG = "BOOKING";
    private final String title = "จองห้อง";

    private Toolbar bookingToolBar;
    private EditText bookingUser;
    private EditText bookingTitle;
    private EditText bookingDetail;
    private EditText bookingDate;
    private EditText bookingStartTime;
    private EditText bookingEndTime;
    private Button bookingSubmit;

    private DatePickerDialog picker;
    private TimePickerDialog  startTimePicker;
    private TimePickerDialog  endTimePicker;

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
      createToolBar();
    }

    private void initElement() {
        bookingToolBar = getView().findViewById(R.id.booking_toolbar);
        bookingDate = getView().findViewById(R.id.booking_date);
        bookingStartTime = getView().findViewById(R.id.booking_start_time);
        bookingEndTime = getView().findViewById(R.id.booking_end_time);
    }

    private void initElementListener() {
        bookingDate.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                bookingDate.setInputType(InputType.TYPE_NULL);
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
                            }
                        }, year, month, day);
                picker.show();
            }
        });

        bookingStartTime.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
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
            }
        });

        bookingEndTime.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
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
            }
        });
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
