<script>
import { mapActions, mapState } from "pinia";
import { useCounterStore } from "../stores/counter";
export default {
    name: 'NavBar',
    methods: {
      ...mapActions(useCounterStore,['logout']),
      clickPost() {
        this.$router.push('/post')
      },
      clickAdd() {
        this.$router.push('/add')
      },
      clickLogin() {
        this.$router.push('/login')
      },
      clickRegister() {
        this.$router.push('/register')
      },
      clickTransaction() {
        this.$router.push('/transaction')
      },
      clickLogout() {
        this.logout()
      }
    },
    computed: {
      ...mapState(useCounterStore,['isLogin'])
    }
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">SEWA LAHAN PARKIR</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
        @click.prevent="clickPost"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#" @click.prevent="clickPost">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#" @click.prevent="clickAdd">Add</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#" @click.prevent="clickLogin" v-if="!isLogin">Login</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#" @click.prevent="clickRegister" v-if="!isLogin">Register</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#" @click.prevent="clickTransaction" v-if="isLogin">My Transaction</a>
          </li>
        </ul>
      </div>
      <div>
        <button class="fixed-right btn btn-secondary" v-if="isLogin" @click="clickLogout">Logout</button>
      </div>
    </div>
  </nav>
</template>