<template>
  <div id="header">
    <nav class="nav justify-content-center p-2">
      <p class="animate__animated animate__flipInY nav-link" v-if="$store.state.user != ''" >Hello : {{ showname }}</p>  
      <router-link  
        class="nav-link"
        to="/"
        active-class="actip"
        exact
        tag="a">Home</router-link>
      <router-link 
        class="nav-link"
        to="/user"
        active-class="actip"
        tag="a">Search</router-link>
      <router-link
        v-if="$store.state.user == ''"
        class="nav-link"
        to="/login"
        active-class="actip"
        tag="a">login</router-link>
        <br>
      <a v-if="$store.state.user != ''" class="nav-link" style="cursor : pointer" @click="logout" href="./home">logout</a>
      <router-link
        to="/cart"
        class="nav-link"
        active-class="actip"
        tag="a">  
        <i class="fa" style="font-size:24px">&#xf07a;</i>
        <span class='badge badge-warning' id='lblCartCount'> {{getsoluong}} </span>
      </router-link>
    </nav>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    methods: {
      logout(){
        localStorage.clear();
        // this.$router.push({path : '*'})
      }
    },
    computed: {
      showname(){
        return this.$store.state.user.username
      },
      getsoluong(){
        return this.$store.state.cart.reduce((a, b)=>{
          return a + b.qty
        },0)
      }
    },
    created() {
    },
  }
</script>

<style scoped>
#lblCartCount {
    font-size: 12px;
    background: #606163;
    color: #fff;
    padding: 0 5px;
    vertical-align: top;
    margin-left: -10px;
    height: 16px;
}
.badge {
  padding-left: 9px;
  padding-right: 9px;
  -webkit-border-radius: 9px;
  -moz-border-radius: 9px;
  border-radius: 9px;
}

.label-warning[href],
.badge-warning[href] {
  background-color: #c67605;
}
#header{
  background-color: rgba(0, 0, 0, 0.5);
  height: 100px;
}
a, p{
  margin-right: 20px;
  color: rgb(255, 255, 255);
  font-size: 30px;
}
a:hover{
  color: #7eff05;
  font-style: italic;
  text-decoration: underline
}
.actip{
  color: #7eff05;
  font-style: italic;
  text-decoration: underline
}
</style>