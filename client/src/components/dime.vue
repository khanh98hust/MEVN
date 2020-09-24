<template>
  <div>
    <h1>dime may</h1>
    <p>name : {{ name }}</p>
    <p>Pass : {{ pass }}</p>
  </div>
</template>

<script>
import jwtdecode from 'jwt-decode';
  export default {
    data() {
      const token = localStorage.usertoken;
      const decode = jwtdecode(token)
      // this.$store.state.user = decode.sub.user
      return {
        name : decode.sub.username,
        pass : decode.sub.password,
      }
    },
  }
</script>

<style scoped>

</style>