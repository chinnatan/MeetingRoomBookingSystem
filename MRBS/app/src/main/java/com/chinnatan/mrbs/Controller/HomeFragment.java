package com.chinnatan.mrbs.Controller;

import android.os.Bundle;
import android.os.Handler;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.chinnatan.mrbs.MainActivity;
import com.chinnatan.mrbs.R;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import static android.os.Looper.getMainLooper;

public class HomeFragment extends Fragment {

    private static final String TAG = "HOME";

    private TextView currentTime;
    private TextView currentDate;

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
    }

    private void init() {
        currentTime = getView().findViewById(R.id.home_currenttime);
        currentDate = getView().findViewById(R.id.home_currentdate);
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

    @Override
    public void onResume() {
        super.onResume();
        displayTime();
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        displayTime = null;
    }
}
