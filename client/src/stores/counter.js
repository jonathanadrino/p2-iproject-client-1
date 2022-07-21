import { defineStore } from "pinia";
import axios from "axios";
const baseUrl = "https://sewa-parkir.herokuapp.com";

export const useCounterStore = defineStore({
  id: "counter",
  state: () => ({
    isLogin: false,
    data: [],
    post: [],
    myPost: [],
    paymentUrl: "",
    myTransaction: [],
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    async login(obj) {
      try {
        const result = await axios({
          method: "POST",
          url: `${baseUrl}/login`,
          data: {
            email: obj.email,
            password: obj.password,
          },
        });

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Logged in`,
          showConfirmButton: false,
          timer: 2000,
        });

        localStorage.setItem("access_token", result.data.access_token);
        localStorage.setItem("email", result.data.email);
        this.isLogin = true;
        this.router.push("/post");
        this.fetchTransactions();
      } catch (err) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: `Please check your input`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    },
    async registerHandler(object) {
      try {
        const result = await axios({
          method: "POST",
          url: `${baseUrl}/register`,
          data: {
            name: object.name,
            email: object.email,
            password: object.password,
            phoneNumber: object.phoneNumber,
            address: object.address,
          },
        });

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Your account has been registered`,
          showConfirmButton: false,
          timer: 2000,
        });
        this.router.push("/login");
      } catch (err) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: `Please check your input`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    },
    async fetchData() {
      try {
        const result = await axios({
          url: `${baseUrl}/post`,
          method: "GET",
        });

        this.data = result.data;
      } catch (err) {
        console.log(err);
      }
    },
    async getPostDetail() {
      try {
        const params = this.router.currentRoute.value.params.id;
        console.log(params);
        const result = await axios({
          method: "GET",
          url: `${baseUrl}/post/${params}`,
        });

        this.post = result.data;
      } catch (err) {
        console.log(err);
      }
    },
    async checkToken() {
      if (localStorage.getItem("access_token")) {
        this.fetchTransactions();
        this.isLogin = true;
        this.router.push("/post");
      }
    },
    async logout() {
      localStorage.clear();
      this.isLogin = false;
      this.router.push("/post");

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Logged out`,
        showConfirmButton: false,
        timer: 2000,
      });
    },
    async rent(obj) {
      try {
        if (!localStorage.getItem("access_token")) {
          this.router.push("/login");
        } else {
          const result = await axios({
            method: "POST",
            url: `${baseUrl}/payment/${obj.id}`,
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
            data: {
              duration: obj.duration,
            },
          });
          console.log(result);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Payment bill created`,
            showConfirmButton: false,
            timer: 2000,
          });
          this.paymentUrl = result.data.url;

          this.router.push("/payment");
        }
      } catch (err) {
        console.log(err);
      }
    },
    async fetchTransactions() {
      try {
        const result = await axios({
          url: `${baseUrl}/transactions`,
          method: "GET",
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        console.log(result);
        console.log("masuuuk");

        this.myTransaction = result.data;
      } catch (err) {
        console.log(err);
      }
    },
  },
});
