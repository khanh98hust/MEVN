<template>
  <div class="container">
    <h1>Cart<button class="btn btn-outline-info ml-5" @click="update">update</button></h1>
    <table class="table">
      <thead>
        <tr>
          <th>Tên</th>
          <th>Giá</th>
          <th>Số lượng</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(a, i) in $store.state.cart" :key="a.name">
          <td scope="row">{{ a.name}}</td>
          <td>{{ a.price }}</td>
          <td><button class="btn btn-info" @click="a.qty > 1 ? a.qty -- : $store.state.cart.splice(i, 1)">-</button> {{ a.qty }} <button class="btn btn-info" @click="a.qty ++">+</button></td>
        </tr>
      </tbody>
    </table>
    <h1>Tổng : {{ tong }} $</h1>
    <hr>
    <a class="btn btn-primary text-center">Checkout</a>
    <div class="form-group pb-5 col-sm-6 justify-content-center">
      <label for="ten">Tên</label>
      <input type="text" name="" id="ten" class="form-control" placeholder="" aria-describedby="helpId">
      
      <label for="sodienthoai">Số điện thoại</label>
      <input type="text" name="" id="sodienthoai" class="form-control" placeholder="" aria-describedby="helpId">
      
      <label for="diachi">Địa chỉ</label>
      <input type="text" name="" id="diachi" class="form-control" placeholder="" aria-describedby="helpId">
       
      <h3>Tổng thanh toán : {{ tong }}</h3>
    </div>
  </div>
</template>

<script>
  import server from '../services/api';
  export default {
    data() {
      return {
      }
    },
    computed: {
      tong(){
        return this.$store.state.cart.reduce((a, b) =>{
          return a + (b.qty * b.price)
        },0)
      }
    },
    methods: {
      update(){
        server.put(`/user/${this.$store.state.user._id}`, this.$store.state.cart).then(res => console.log(res)).catch(err => console.log('err'))
      }
    },
  }
</script>

<style scoped>
.container{
  height: auto;
  color: white;
  background-color: rgba(53, 47, 47, 0.7);
  border-radius: 20px;
}
.table{
  color: white;
}
</style>