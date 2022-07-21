<script>
import { mapActions, mapState } from "pinia";
import { useCounterStore } from "../stores/counter";
import leaflet from "leaflet";
export default {
  name: "Detail",
  data() {
    return {
        duration: 0
    }
  },
  methods: {
    ...mapActions(useCounterStore, ["getPostDetail",'rent']),
    clickRent() {
      this.rent({
        duration: this.duration,
        id: this.post.id,
      })
    },
    checkDetail() {
        this.getPostDetail()
    },
     async getDetailMap() {
      await navigator.geolocation.getCurrentPosition(
        (e) => {
          console.log(e);
          console.log(e.coords.latitude);
          console.log(e.coords.longitude);
          this.lat = e.coords.latitude;
          this.lng = e.coords.longitude;
          this.center = [+e.coords.latitude, +e.coords.longitude];
          this.permitted = true;
          let mymap = leaflet.map("map").setView([this.lat, this.lng], 17);
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

          leaflet
              .marker([this.post.latitude, this.post.longitude])
              .bindPopup(`${this.post.name} , ${this.post.address}`)
              .addTo(mymap);
        },
        (err) => {
          console.log(err);
        }
      );
    },
  },
  computed: {
    ...mapState(useCounterStore, ["post"]),
  },
  created() {
    this.checkDetail();
  },
  mounted() {
    this.getDetailMap()
  }
};
</script>
<template>
  <section class="container px-4 px-lg-5 my-5">
    <center>
      <h1 class="pt-2">SEWA LAHAN PARKIR</h1>
    </center>
    <div id="map" class="w-50 h-50 py-3 px-5"></div>
    <div class="row gx-4 gx-lg-5 align-items-center mt-5">
      <div class="col-md-6"></div>
      <div class="col-md-6 pt-0 mt-0 pr-0">
        <div>
            <h1>{{post.name}}</h1>
        </div>
        <div>
            <h3>{{post.address}}</h3>
        </div>
        <div class="mb-3">
            <h3>IDR {{post.price.toLocaleString()}} / MONTH</h3>
        </div>
            <h4> MR / MRS {{post.User.name}}</h4>
        <div class="mb-3">
            <div>
                <img :src="post.idUrl" alt="">
            </div>
          <button @click="clickRent" class="btn btn-primary btn-lg  my-2">
            RENT
          </button>
          <input type="number" v-model="duration" class="ml-3"> MONTH
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
#map {
    margin-top: 3.5%;
    width: 100px;
}
</style>
