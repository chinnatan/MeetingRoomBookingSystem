<template>
  <div class="col-md-12 signin-banner">
    <div class="row h-100">
      <div class="col-md-8 mx-auto my-auto">
        <div class="row">
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-12">
                <h1 class="signin-title-text signin-text-en">{{title.nameEn}}</h1>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <h4 class="signin-title-text signin-text-th">{{title.nameTh}}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4 signin-background animated fadeInRight">
        <div class="row h-100">
          <div class="col-md-12 mx-auto my-auto">
            <div class="row">
              <div class="col-md-10 mx-auto">
                <h4 class="signin-text-en text-left">{{signin.title}}</h4>
              </div>
            </div>
            <div class="row">
              <div class="col-md-10 mx-auto">
                <form>
                  <div class="form-group mt-4">
                    <input
                      type="text"
                      class="form-control signin-text-en"
                      id="inputUsername"
                      :placeholder=signin.txtUsername
                    />
                  </div>
                  <div class="form-group mt-4">
                    <input
                      type="password"
                      class="form-control signin-text-en"
                      id="inputPassword"
                      :placeholder=signin.txtPassword
                    />
                  </div>
                  <button type="submit" class="btn btn-primary col-md-12 mt-2 signin-text-en">{{signin.txtLogin}}</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignIn",
  data() {
    return {
      title: {
        nameEn: "Meeting Room Booking System",
        nameTh: "ระบบจองห้องประชุม"
      },
      signin: {
        title: "Sign In",
        txtUsername: "Username",
        txtPassword: "Password",
        txtLogin: "Login"
      }
    };
  }
};
</script>

<style scoped>
.signin-banner {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.3),
      rgba(0, 0, 0, 0.3)
    ),
    url("../assets/image/itkmitl-building.jpg");
  background-repeat: no-repeat;
  background-attachment: scroll;
  background-position: center center;
  background-size: cover;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
}

.signin-title-text {
  color: white;
}

.signin-text-en {
  font-family: "RobotoMono-Medium";
}

.signin-text-th {
  font-family: "Mitr-Medium";
}

.signin-background {
  background: white;
}
</style>