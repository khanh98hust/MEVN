<template>
  <div class="container">
    <h3 style="color:white">Kết quả</h3>
    <div class="lol">
      <ul>
        <li class="form-control" v-for="x in list" :key="x._id">{{ x.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list : this.$store.state.list
      }
    },
  }
</script>

<style scoped>
  .lol{
    display: block;
    overflow: auto;
    height: 80vh;
    /* min-height: 100% !important; */
  }
</style>