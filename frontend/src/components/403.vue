<template>
  <div id="404" class="h-100">
    <div id="content" class="container h-100">
      <div class="row h-100">
        <div class="col-md-12 my-auto">
          <div class="row">
            <div class="col-md-12">
              <h1 class="display-1 font-color-primary">{{ content.text.error_code }}</h1>
              <h3>{{ content.text.error_code_name }}</h3>
              <small class="text-muted">{{ content.text.error_code_description }}</small>
            </div>
          </div>
          <div class="row m-5">
            <div class="col-md-12">
              <router-link :to="{path: '/home' }" replace>
                <button
                  type="button"
                  class="btn btn-lg btn-outline-variasi-warna"
                >{{ button.back_home }}</button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Forbidden",
  data() {
    return {
      content: {
        text: {
          error_code: "403",
          error_code_name: "Forbidden",
          error_code_description: "คุณไม่มีสิทธิ์เข้าถึงหน้านี้"
        }
      },
      button: {
        back_home: "กลับหน้าหลัก"
      }
    };
  }
};
</script>