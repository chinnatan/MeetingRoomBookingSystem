<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-primary bg-primary shadow fixed-top">
      <div class="container">
        <a class="navbar-brand" href="#">{{ navbar.brand }}</a>
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
            <li class="nav-item active">
              <a class="nav-link" href="#">
                {{ navbar.home }}
                <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">{{ navbar.booking }}</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">{{ navbar.history }}</a>
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
                <router-link :to="'#'" v-on:click.native="Logout" class="dropdown-item">{{ navbar.account.logout }}</router-link>
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
        brand: "ระบบจองห้องประชุม",
        booking: "รายละเอียดการจอง",
        home: "หน้าหลัก",
        history: "ประวัติการใช้งาน",
        account: {
            username: "test",
            logout: "ออกจากระบบ"
        }
      }
    };
  }
};
</script>