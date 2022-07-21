<script>
import leaflet from "leaflet";
// import firebase from 'firebase'
import axios from "axios";

export default {
  data() {
    return {
      lat: 0,
      lng: 0,
      clickedLat: 0,
      clickedLng: 0,
      address: "",
      tempImg: "",
      ktp: {},
      price: 0,
    };
  },
  methods: {
    async getMap() {
      await navigator.geolocation.getCurrentPosition(
        (e) => {
          console.log(e);
          console.log(e.coords.latitude);
          console.log(e.coords.longitude);
          this.lat = e.coords.latitude;
          this.lng = e.coords.longitude;
          this.center = [+e.coords.latitude, +e.coords.longitude];
          this.permitted = true;
          let mymap = leaflet.map("map").setView([this.lat, this.lng], 14);
          leaflet
            .tileLayer(
              "https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=HgdBfKWwK1kyyRLgFKDH",
              {
                attribution:
                  '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
              }
            )
            .addTo(mymap);

          leaflet
            .marker([this.lat, this.lng])
            .addTo(mymap)
            .bindPopup(`Your location`)
            .openPopup();

          let marker = null;

          mymap.on("click", function (e) {
            if (marker !== null) {
              mymap.removeLayer(marker);
            }
            marker = leaflet
              .marker(e.latlng)
              .addTo(mymap)
              .addTo(mymap)
              .bindPopup(
                `Clicked location  \n
                ${e.latlng.lat}
                ${e.latlng.lng}
              `
              )
              .openPopup();

            localStorage.setItem("lat", e.latlng.lat);
            localStorage.setItem("lng", e.latlng.lng);
          });
        },
        (err) => {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: `Please allow location service`,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      );
    },
    check() {
      this.clickedLat = localStorage.getItem("lat");
      this.clickedLng = localStorage.getItem("lng");
    },
    selectKTP(event) {
      let file = event.target.files[0];

      this.tempImg = URL.createObjectURL(file);

      this.ktp = file;
    },
    async upload() {
      try {
        let file = this.ktp;
        console.log(file);

        // file.user = 'asd'
        const formData = new FormData();

        formData.append(
          "image",
          file,
          Math.floor(1000 + Math.random() * 9000).toString()
        );
        formData.append("address", this.address);
        formData.append("price", this.price);
        formData.append("lat", this.clickedLat);
        formData.append("lng", this.clickedLng);

        // console.log(formData);

        const result = await axios.post(
          "https://sewa-parkir.herokuapp.com/post",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              access_token: localStorage.getItem("access_token"),
            },
          }
        );

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Your request has been posted`,
          showConfirmButton: false,
          timer: 2000,
        });
        console.log(result);
        this.$router.push("/post");
      } catch (err) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: `Failed to post request`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    },
  },
  created() {
    this.getMap();
  },
};
</script>

<template>
  <section class="container px-4 px-lg-5 my-5">
    <center>
      <h1 class="pt-2">SEWAIN LAHAN PARKIR KAMU</h1>
    </center>
    <div id="map" @dblclick="check" class="w-50 h-50 py-3 px-5"></div>
    <div class="row gx-4 gx-lg-5 align-items-center">
      <div class="col-md-6"></div>
      <div class="col-md-6 pt-0 mt-0 pr-0">
        <div class="form-group">
          <label for="formGroupExampleInput2" required>Full Address</label>
          <textarea
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            v-model="address"
            required
          ></textarea>
        </div>
        <div class="form-group">
          <label for="exampleFormControlInput1"
            >Price per month (IDR) , Please do not use (.)</label
          >
          <input
            type="number"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="insert price"
            v-model="price"
            required
          />
        </div>
        <div class="mb-3">
          <label for="formFile" class="form-label">Input Identity Card</label>
          <input
            class="form-control"
            type="file"
            id="formFile"
            v-on:change="selectKTP"
            required
          />
          <img :src="tempImg" alt="" />
        </div>
        <div class="mb-3">
          <button @click="upload" class="btn btn-primary btn-lg px-2 my-2">
            UPLOAD
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
#map {
  position: absolute;
  top: 120px;
  bottom: 0;
  left: 10px;
  right: 0px;
  width: 100px;
  height: 100px;
}
</style>
