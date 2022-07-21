<script>
import { mapActions, mapState } from "pinia";
import { useCounterStore } from "../stores/counter";
export default {
  name: "RegisterPage",
  data() {
    return {
      object: {
        name: "",
        email: "",
        password: "",
        phoneNumber: "",
        address: "",
      },
    };
  },
  methods: {
    ...mapActions(useCounterStore, [
      "registerHandler"
    ]),
    submitRegister() {
      this.registerHandler(this.object);
    },
  },
};
</script>
<template>
  <div class="container pt-3 mt-5">
    <h2>REGISTER</h2>
  </div>
  <div>
    <div class="modal-dialog modal-login">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Register account</h5>
        </div>
        <div class="modal-body">
          <form action="/examples/actions/confirmation.php" method="post">
            <div class="form-group py-3">
              <i class="fa fa-user"></i>
              <input
                type="text"
                class="form-control "
                placeholder="Name"
                required="required"
                v-model="object.name"
              />
            </div>
            <div class="form-group">
              <i class="fa fa-lock"></i>
              <input
                type="text"
                class="form-control"
                placeholder="Email"
                required="required"
                v-model="object.email"
              />
            </div>
            <div class="form-group py-3">
              <i class="fa fa-lock"></i>
              <input
                type="password"
                class="form-control"
                placeholder="Password"
                required="required"
                v-model="object.password"
              />
            </div>
            <div class="form-group">
              <i class="fa fa-lock"></i>
              <input
                type="text"
                class="form-control"
                placeholder="Phone Number"
                required="required"
                v-model="object.phoneNumber"
              />
            </div>
            <div class="form-group py-3">
              <i class="fa fa-lock"></i>
              <input
                type="text"
                class="form-control"
                placeholder="Address"
                required="required"
                v-model="object.address"
              />
            </div>
              <div class="form-group">
                <center>
                <input
                  type="submit"
                  class="btn btn-primary btn-block btn-lg btn-light"
                  value="Submit"
                  @click.prevent="submitRegister"
                />
            </center>
              </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>