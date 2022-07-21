<script>
import { mapActions, mapState } from "pinia";
import { useCounterStore } from "../stores/counter";
import leaflet from "leaflet";
import PostCard from "../components/PostCard.vue";
export default {
  name: "PostPage",
  computed: {
    ...mapState(useCounterStore, ["data"]),
  },
  methods: {
    ...mapActions(useCounterStore, ["fetchData"]),
    async getPostMap() {
      await navigator.geolocation.getCurrentPosition(
        (e) => {
          console.log(e);
          console.log(e.coords.latitude);
          console.log(e.coords.longitude);
          this.lat = e.coords.latitude;
          this.lng = e.coords.longitude;
          this.center = [+e.coords.latitude, +e.coords.longitude];
          this.permitted = true;
          let mymap = leaflet.map("mapid").setView([this.lat, this.lng], 14);
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
          for (const e of this.data) {
            leaflet
              .marker([e.latitude, e.longitude])
              .bindPopup(`${e.name} , ${e.address}`)
              .addTo(mymap);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    fetch() {
      this.fetchData();
    },
  },
  created() {
    this.fetch();
  },
  mounted() {
    this.getPostMap();
  },
  components: { PostCard },
};
</script>

<template>
  <center>
    <div id="mapid"></div>
    <h1 id="title">Parkiran available near you</h1>
    <div id="postcont">
      <PostCard v-for="post in data" :key="post.id" :post="post" />
    </div>
  </center>
</template>

<style>
#mapid {
  position: absolute;
  top: 65px;
  bottom: 0;
  left: auto;
  right: auto;
  width: 100%;
  height: 200px;
}

#postcont {
  margin-top: 10px;
  padding-left: auto;
  padding-right: auto;
}

#title {
  margin-top: 20%;
}
</style>
