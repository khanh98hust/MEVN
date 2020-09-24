<template>
  <div style="color : white" class="container mt-5">
    <h1 class="text-center mb-5">Product detail</h1>
    <img :src="product.img" alt="" style="width : 300px">
    <hr>
    <h3>Name : {{ product.name }}</h3>
    <h3>Gia : {{ product.price }}</h3>
    <h3>So luong : {{ product.soluong }}</h3>
    <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet sint minima odit repellat nemo rerum, perferendis voluptatem quibusdam magnam iure dolor. Esse eligendi cum, rerum facilis neque autem laudantium ducimus?</h4>
  </div>
</template>

<script>
  import server from '../services/api';
  export default {
    data() {
      return {
        id : this.$route.params.id,
        product : {}
      }
    },
    methods: {
      viewproduct(){
        return server.get(`/product/${this.id}`)
        .then(res => {
          this.product = res.data
        })
        .catch(err => console.log(err))
      }
    },
    created() {
      this.viewproduct()
    },
  }
</script>

<style scoped>

</style>