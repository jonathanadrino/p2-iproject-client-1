<script>
import { RouterLink, RouterView } from "vue-router";
import { mapStores, mapState, mapActions } from "pinia";
import { useCounterStore } from "./stores/counter";
import NavBar from "./components/NavBar.vue";
export default {
  components: {
    RouterView,
    NavBar,
  },
  methods: {
    ...mapActions(useCounterStore, ["fetchData",'checkToken']),
    fetchLoc() {
      this.fetchData()
    }
  },
  created() {
    this.fetchLoc()
    this.checkToken()
  },
};
</script>

<template>
  <NavBar />
  <RouterView />
</template>

<style></style>
