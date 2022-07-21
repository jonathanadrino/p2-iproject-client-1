import { defineStore } from "pinia";
import axios from "axios";
const baseUrl = "http://localhost:3000";

export const useCounterStore = defineStore({
  id: "counter",
  state: () => ({
    isLogin: false,
    data: [],
    post: [],
    myPost: [],
    paymentUrl: '',
    myTransaction: []
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

        localStorage.setItem("access_token", result.data.access_token);
        localStorage.setItem("email", result.data.email);
        this.isLogin = true;
        this.router.push("/post");
        this.fetchTransactions()
      } catch (err) {
        console.log(err);
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
        this.router.push("/login");
      } catch (err) {
        console.log(err);
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
        this.fetchTransactions()
        this.isLogin = true;
        this.router.push("/post");
      }
    },
    async logout() {
      localStorage.clear();
      this.isLogin = false;
      this.router.push("/post");
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
          this.paymentUrl = result.data.url

          this.router.push('/payment')
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
            access_token: localStorage.getItem('access_token')
          }
        });
        console.log(result);
        console.log('masuuuk');

        this.myTransaction = result.data;

      } catch (err) {
        console.log(err);
      }
    },
  },
});
