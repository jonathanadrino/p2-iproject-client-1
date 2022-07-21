<script>
export default {
    name : 'PostCard',
    props: ['post'],
    methods: {
         clickDetail() {
      this.$router.push(`/post/${this.post.id}`);
      this.inWishlist = true;
    },
    }
}
</script>

<template>
<div class="card text-center bg-white  text-dark py-5 pb-2" id="postcard">
  <div class="card-header">
    Available
  </div>
  <div class="card-body">
    <h5 class="card-title">{{post.address}}</h5>
    <p class="card-text">{{post.createdAt}}</p>
    <a href="#" class="btn btn-primary" @click.prevent="clickDetail">View Parkiran</a>
  </div>
  <div class="card-footer text-muted">
  </div>
</div>
</template>

<style>
#postcard {
    margin-top: 10px;
    padding-left: auto;
    padding-right: auto;
    padding-bottom: 5px;
}
</style>