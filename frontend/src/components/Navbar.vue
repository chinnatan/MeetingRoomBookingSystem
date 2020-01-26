<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-second bg-white shadow-sm fixed-top">
      <div class="container">
        <router-link :to="{path: '/home' }" class="navbar-brand" replace>
          <font color="black">{{navbar.brand}}{{navbar.brandMeeting}}</font>
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link :to="{path: '/home' }" class="nav-link" replace>{{ navbar.home }}</router-link>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarBookingDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >{{ navbar.bookingTitle }}</a>
              <div class="dropdown-menu" aria-labelledby="navbarBookingDropdown">
                <router-link
                  :to="{path: '/booking' }"
                  class="dropdown-item"
                  replace
                >{{ navbar.bookingDropdown.booking }}</router-link>
                <router-link
                  :to="{path: '/manage/booking' }"
                  class="dropdown-item"
                  replace
                >{{ navbar.bookingDropdown.bookingInformation }}</router-link>
              </div>
            </li>
            <li class="nav-item">
              <router-link :to="{path: '/report/tool' }" class="nav-link" replace>{{ navbar.reportDamaged }}</router-link>
            </li>
          </ul>
          <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
            <li class="nav-item dropdown">
              <a
                class="nav-link"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i class="fa fa-user"></i>
                {{ navbar.account.username }}
                <i class="fa fa-caret-down"></i>
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <router-link
                  :to="'#'"
                  v-on:click.native="Logout"
                  class="dropdown-item"
                >{{ navbar.account.logout }}</router-link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      navbar: {
        brand: "ระบบจอง",
        brandMeeting: "ห้องประชุม",
        bookingTitle: "จัดการการจอง",
        bookingDropdown: {
          booking: "จองห้อง",
          bookingInformation: "ข้อมูลการจอง"
        },
        reportDamaged: "แจ้งอุปกรณ์เสียหาย",
        home: "หน้าหลัก",
        account: {
          username: "ชินธันย์ ชาติทอง",
          logout: "ออกจากระบบ"
        }
      }
    };
  }
};
</script>