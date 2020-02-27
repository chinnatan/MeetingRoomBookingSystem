package com.chinnatan.mrbs.Controller.Adapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.chinnatan.mrbs.Model.Booking;
import com.chinnatan.mrbs.R;

import java.util.ArrayList;
import java.util.List;

public class BookingAdapter extends ArrayAdapter {

    private static final String TAG = "BOOKING ADAPTER";

    private List<Booking> bookingList = new ArrayList<Booking>();
    private Context context;

    public BookingAdapter(@NonNull Context context, int resource, @NonNull List<Booking> objects) {
        super(context, resource, objects);
        this.bookingList = objects;
        this.context = context;
    }

    @NonNull
    @Override
    public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {
        final View listBookingItem = LayoutInflater.from(context).inflate(R.layout.fragment_home_booking_item, parent, false);

        final TextView bookingTitle = listBookingItem.findViewById(R.id.booking_item_title);
        final TextView bookingTime = listBookingItem.findViewById(R.id.booking_item_time);
        final Booking row = bookingList.get(position);

        bookingTitle.setText(row.getBookingTitle());
        bookingTime.setText(row.getBookingTime());

        return listBookingItem;
    }
}
