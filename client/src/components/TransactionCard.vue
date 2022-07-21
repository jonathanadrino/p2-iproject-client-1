<script>
export default {
  name: "TransactionCard",
  props: ["transaction"],
  methods: {
    clickPost() {
        this.$router.push(`/post/${this.transaction.Post.id}`)
    }
  }
};
</script>

<template>
      <center>
  <div class="card">
    <div class="card-header">{{transaction.Post.name}}</div>
    <div class="card-body">
      <blockquote class="blockquote mb-0">
        <p>
          {{ transaction.createdAt }}
        </p>
        <footer class="blockquote-footer">
          {{ transaction.Post.address }}
              <button class="fixed-right btn btn-secondary" @click="clickPost">View Post</button>
        </footer>
      </blockquote>
    </div>
  </div>
          </center>
</template>
