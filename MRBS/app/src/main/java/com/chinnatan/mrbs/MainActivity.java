package com.chinnatan.mrbs;

import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;

import android.content.pm.ActivityInfo;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;
import android.util.Log;

import com.chinnatan.mrbs.Controller.HomeFragment;
import com.chinnatan.mrbs.Controller.SettingFragment;

public class MainActivity extends AppCompatActivity {

    public static String stateFragmentName = null;
    public static final String URL_API = "http://192.168.1.2:4000/";
    public static final String URL_SOCKET = "http://192.168.1.2:4001/";
    public static final String URL_SOCKETMCU = "http://192.168.1.2:4001/";

    private static final String TAG = "MAINACTIVITY";

    private Fragment fragment;
    private Fragment fragmentHome;
    private Fragment fragmentSetting;

    private SQLiteDatabase myDB;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);

        myDB = openOrCreateDatabase("my.db", MODE_PRIVATE, null);
        myDB.execSQL("CREATE TABLE IF NOT EXISTS setting (id INTEGER PRIMARY KEY AUTOINCREMENT, roomid INTEGER, roomname VARCHAR(200))");

        init(savedInstanceState);
    }

    private void init(Bundle bundle) {
        if (bundle == null) {
            Cursor cursor = myDB.rawQuery("select * from setting", null);
            cursor.moveToFirst();
            if(cursor.isFirst()) {
                fragment = new HomeFragment();
            } else {
                fragment = new SettingFragment();
            }
            cursor.close();

            getSupportFragmentManager().beginTransaction().replace(R.id.main_view, fragment).commit();
        }
    }

    public static void onFragmentChanged(String fragmentName) {
        Log.d(TAG, "onFragmentChanged: (Change to page) " + fragmentName);
        if (fragmentName.equalsIgnoreCase("HOME") || fragmentName.equalsIgnoreCase("SETTING") || fragmentName.equalsIgnoreCase("BOOKING")) {
            if (fragmentName.equals("HOME")) {
                Log.d(TAG, "CHECK THIS IS HOME");
                stateFragmentName = fragmentName;
            } else if (fragmentName.equals("SETTING")) {
                Log.d(TAG, "CHECK THIS IS SETTING");
                stateFragmentName = fragmentName;
            } else if (fragmentName.equals("BOOKING")) {
                Log.d(TAG, "CHECK THIS IS BOOKING");
                stateFragmentName = fragmentName;
            }
        }
    }

    @Override
    public void onBackPressed() {
        if (getSupportFragmentManager().getBackStackEntryCount() >= 1) {
            getSupportFragmentManager()
                    .popBackStack();
        } else {
            finish();
        }
    }
}
