import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)
import jwtdecode from 'jwt-decode';

export const store = new Vuex.Store({
  state:{
    timkiem : [],
    ketqua : 0,
    time : 0,
    user : '',
    cart : []
  }
})

// if(localStorage.usertoken){
//   var decode = jwtdecode(localStorage.usertoken).sub
//   this.$store.state.user = decode 
// }