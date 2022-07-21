import { createApp , markRaw} from "vue";
import { createPinia } from "pinia";
import { initializeApp } from "firebase/app";

import App from "./App.vue";
import router from "./router";

// import './assets/main.css'

const firebaseConfig = {
  apiKey: "AIzaSyC9PydkvoKyRV2dJsXbp2cAuHZ0fhNftIg",
  authDomain: "sewa-parkir.firebaseapp.com",
  projectId: "sewa-parkir",
  storageBucket: "sewa-parkir.appspot.com",
  messagingSenderId: "1057559724648",
  appId: "1:1057559724648:web:8760208d43b6803491b1dd",
};

initializeApp(firebaseConfig);

const app = createApp(App);
const pinia = createPinia();

pinia.use(({ store }) => {
  store.router = markRaw(router);
});

app.use(router);
app.use(pinia);

app.mount("#app");
