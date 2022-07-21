<script>
import { mapActions, mapState } from "pinia";
import { useCounterStore } from "../stores/counter";

export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(useCounterStore, ["login"]),
    submitLogin() {
      this.login({
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>

<template>
   <div class="container pt-3 mt-5">
    <h2>LOGIN</h2>
  </div>
  <div>
    <div class="modal-dialog modal-login pt-3">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Insert email & password</h5>
        </div>
        <div class="modal-body px-4">
          <form method="post">
            <div class="form-group justify-content-center">
              <i class="fa fa-user"></i>
              <input
                type="text"
                class="form-control"
                placeholder="Email"
                required="required"
                v-model="email"
              />
            </div>
            <div class="form-group py-3">
              <i class="fa fa-lock"></i>
              <input
                type="password"
                class="form-control"
                placeholder="Password"
                required="required"
                v-model="password"
              />
            </div>
            <div class="form-group py-1">
              <center>
                <input
                  type="submit"
                  class="btn btn-primary btn-block btn-lg btn-light"
                  value="Enter"
                  @click.prevent="submitLogin"
                />
              </center>
            </div>
          </form>
         
        </div>
      </div>
    </div>
  </div>
</template>
