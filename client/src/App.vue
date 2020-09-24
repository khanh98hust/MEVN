<template>
  <div id="app">
    <Header></Header>
    <router-view/>
    <div class="card text-center footer">
      <div class="card-footer">
        Featured
      </div>
      <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn-primary">Go top</a>
      </div>
      <div class="card-footer" style="font-size : 20px">
        Khánh ciutoe
      </div>
    </div>
  </div>
</template>

<script>
import server from '../src/services/api';
import Header from './components/header'
import jwtdecode from 'jwt-decode';
export default {
  components: { Header },
  name: 'App',
  data(){
    return{

    }
  }, 
  methods: {
    user(){
      if(localStorage.usertoken){
        this.$store.state.user = jwtdecode(localStorage.usertoken).sub // chuyen token sang user
      }
    },
    cart(){
    server.get(`/user/${this.$store.state.user._id}`).then(res =>{
      console.log(res.data.cart);
      this.$store.state.cart = res.data.cart
    })
    .catch(err => console.log('err'))
  }
  },
  created() {
    this.user(),
    this.cart()
  },
}
</script>

<style type="text/css" scoped>
#app{
  background-image : url('https://zicxaphotos.com/wp-content/uploads/2019/09/T%E1%BB%95ng-h%E1%BB%A3p-c%C3%A1c-h%C3%ACnh-%E1%BA%A3nh-l%C3%A0m-h%C3%ACnh-n%E1%BB%81n-m%C3%A0u-t%C3%ADm-%C4%91%E1%BA%B9p-nh%E1%BA%A5t-24.jpg');
  background-repeat : no-repeat;
  background-size:100%;
  background-attachment: fixed;
  font-family: 'Pacifico', cursive;
}
* {
  cursor: url('https://www.howkteam.vn/Content/images/cursor/rocket_24.png'), auto !important;
  }
.footer{
  color: white ;
  background-color: rgba(13, 13, 14, 0.7);
}
</style>
