package com.chinnatan.mrbs.Model;

public class DoorOpenRs {
    private boolean isOpen;

    public DoorOpenRs(boolean isOpen) {
        this.isOpen = isOpen;
    }

    public boolean isOpen() {
        return isOpen;
    }

    public void setOpen(boolean open) {
        isOpen = open;
    }
}
