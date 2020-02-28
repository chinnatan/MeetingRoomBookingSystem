package com.chinnatan.mrbs.Controller;

import android.content.ContentValues;
import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.Spinner;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.chinnatan.mrbs.Interface.JsonPlaceHolderApi;
import com.chinnatan.mrbs.MainActivity;
import com.chinnatan.mrbs.Model.Booking;
import com.chinnatan.mrbs.Model.BookingDao;
import com.chinnatan.mrbs.Model.Room;
import com.chinnatan.mrbs.Model.RoomDao;
import com.chinnatan.mrbs.R;
import com.github.nkzawa.socketio.client.Socket;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class SettingFragment extends Fragment {
    private static final String TAG = "SETTING";

    private Spinner spinnerRoomName;
    private Button buttonSave;
    private ArrayList<Room> roomArrayList = new ArrayList<>();
    private ArrayList<String> roomNameArrayList = new ArrayList<String>();
    private String roomNameCompare;
    private JsonPlaceHolderApi JsonPlaceHolderApi;
    private Socket socketService;
    private SQLiteDatabase myDB;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_setting, container, false);
    }

    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
        MainActivity.onFragmentChanged(TAG);

        init();
        Retrofit retrofit = new Retrofit.Builder().baseUrl("http://192.168.1.2:4000/").addConverterFactory(GsonConverterFactory.create()).build();
        JsonPlaceHolderApi = retrofit.create(JsonPlaceHolderApi.class);
        getRoomName();
    }

    private void init() {
        myDB = getActivity().openOrCreateDatabase("my.db", Context.MODE_PRIVATE, null);
        spinnerRoomName = getView().findViewById(R.id.setting_spinner_select_room);
        buttonSave = getView().findViewById(R.id.setting_button_save);
        initSpinner();
        initButton();
    }

    private void initSpinner() {
        spinnerRoomName.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                roomNameCompare = roomNameArrayList.get(position);
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });
    }

    private void initButton() {
        buttonSave.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                for (Room room : roomArrayList) {
                    if(room.getRoomName().equals(roomNameCompare)) {
                        // SQLLite Setting
                        ContentValues contentValues = new ContentValues();
                        contentValues.put("roomid", room.getRommId());
                        contentValues.put("roomname", room.getRoomName());

                        myDB.insert("setting", null, contentValues);

                        getActivity().getSupportFragmentManager().beginTransaction().replace(R.id.main_view, new HomeFragment()).commit();
                    }
                }
            }
        });
    }

    private void getRoomName() {
        Call<List<RoomDao>> call = JsonPlaceHolderApi.getRoomName();
        call.enqueue(new Callback<List<RoomDao>>() {
            @Override
            public void onResponse(Call<List<RoomDao>> call, Response<List<RoomDao>> response) {
                if (!response.isSuccessful()) {
                    Toast.makeText(getContext(), "ไม่พบห้อง", Toast.LENGTH_LONG).show();
                    return;
                }

                List<RoomDao> roomDaos = response.body();
                roomArrayList.clear();

                for(RoomDao roomDao : roomDaos) {
                    Room room = new Room();
                    if(roomDao.getRoomActive() == 1) {
                        room.setRommId(roomDao.getRoomId());
                        room.setRoomName(roomDao.getRoomName());
                        roomArrayList.add(room);
                    }
                }

                addRoomNameToSpinner();
            }

            @Override
            public void onFailure(Call<List<RoomDao>> call, Throwable t) {
                Log.e("E", t.getMessage());
                Toast.makeText(getContext(), "ไม่สามารถแสดงข้อมูลได้", Toast.LENGTH_LONG).show();
            }
        });
    }

    private void addRoomNameToSpinner() {
        for(Room room : roomArrayList) {
            roomNameArrayList.add(room.getRoomName());
        }

        ArrayAdapter<String> adapterRoomName = new ArrayAdapter<String>(getContext(),
                android.R.layout.simple_dropdown_item_1line, roomNameArrayList);
        spinnerRoomName.setAdapter(adapterRoomName);
    }
}
