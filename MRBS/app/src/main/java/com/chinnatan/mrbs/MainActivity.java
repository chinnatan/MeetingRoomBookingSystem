package com.chinnatan.mrbs;

import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;

import android.content.pm.ActivityInfo;
import android.os.Bundle;
import android.util.Log;

import com.chinnatan.mrbs.Controller.HomeFragment;

public class MainActivity extends AppCompatActivity {

    private static final String TAG = "MAINACTIVITY";

    private Fragment fragment;
    private Fragment fragmentHome;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        init(savedInstanceState);
    }

    private void init(Bundle bundle) {
        if (bundle == null) {
            fragment = new HomeFragment();
            getSupportFragmentManager().beginTransaction().replace(R.id.main_view, fragment).commit();
        }
    }

    public static void onFragmentChanged(String fragmentName) {
        Log.d(TAG, "onFragmentChanged: (Change to page)" + fragmentName);
        if (fragmentName.equalsIgnoreCase("HOME") || fragmentName.equalsIgnoreCase("MY") || fragmentName.equalsIgnoreCase("REQUEST") || fragmentName.equalsIgnoreCase("VETERINARY")) {
            if (fragmentName.equals("HOME")) {
                Log.d(TAG, "check nav 0");
            } else if (fragmentName.equals("VETERINARY")) {
                Log.d(TAG, "check nav 1");
            } else if (fragmentName.equals("REQUEST")) {
                Log.d(TAG, "check nav 2");
            } else if (fragmentName.equals("MY")) {
                Log.d(TAG, "check nav 3");
            }
        }
    }
}
