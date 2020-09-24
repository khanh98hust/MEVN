<template>
  <div class="container height">
    <form class="form-group">
      <transition 
        enter-active-class="animate__animated animate__zoomInLeft"
        leave-active-class="animate__animated animate__zoomOutRight">
      <h3 v-if="thongbao != ''" class="text-center">{{ thongbao }}></h3>
      </transition>
      <div class="d-flex justify-content-center mt-5">
        <div class="animate__animated animate__bounceInUp login" style="width:400px">
        <label for="user" class="textt">Username</label>
        <input id="user" type="text" class="form-control" v-model="user.username">
        <br>
        <label for="pas" class="textt">Password</label>
        <input id="pas" type="text" class="form-control" v-model="user.password">
        <br>  
        <button type="submit" class="btn btn-outline-primary" @click.prevent="login">login</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import jwtdecode from 'jwt-decode';
import server from '../services/api';
  export default {
    data() {
      return {
        thongbao : '',
        user : {
          username : '',
          password : ''
        }
      }
    },
    methods: {
      login(){
        // axios.post('http://localhost:3333/api/login', this.user)
        server.post('login', this.user)
        .then(res =>{
          console.log('done!');
          localStorage.setItem('usertoken', res.data.token)
          this.$store.state.user = res.data.user || {username : ''}
          // localStorage.clear()
          this.$router.push('/')
        })
        .catch(err => {
          this.thongbao = 'Ten tai khoan hoac mat khau ko dung'
          setTimeout(()=>{
            this.thongbao = ''
          }, 2000)
        })
      }
    },
  }
</script>

<style scoped>
  h3{
    color: rgb(255, 255, 255);
  }
  .login{
    border : 4px solid rgb(255, 255, 255);
    padding: 40px;
    border-radius : 30px;
    background-color: rgb(73, 26, 114)
  }
  .textt{
    color: white;
  }
  .height{
    height: 660px
  }
</style>