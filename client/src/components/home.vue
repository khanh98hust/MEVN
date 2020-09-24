<template>
  <div> 
    <!-- <p style="color : white">{{$store.state.cart}}</p> -->
    <transition enter-active-class="animate__animated animate__fadeInDown" leave-active-class="animate__animated animate__fadeOutDown">
      <h1 v-if="notification" class="notification">Done!</h1>
    </transition>
    <transition>
    <img style= "width : 1420px; height : 400px;object-fit: cover; border-radius : 40px" class="m-5" :src="anh[count]">
    </transition>
    <div class="container">
      <!-- <p v-for="item in list" :key="item._id">{{ item }}</p> -->
      <!-- <h3>cart : {{ $store.state.cart }}</h3> -->
      <h1 style="color : white">Sản phẩm ({{page}} / {{perpage}})</h1>
      <br>
      <div class="card-deck d-flex">
        <div v-for="item in show" :key="item._id" style="width : 24%" class="ml-1 mb-5 carditem">
          <div class="card mb-3">
            <div class="card-body">
            <h5 class="card-title">{{ item.name }}</h5>
            <img :src="item.img" alt="">
            <hr style="background-color : white;  height : 2px">
            <p class="card-text">Decription ...</p>
            <p class="card-text"><small>Price : {{ item.price}} $</small></p>
            <router-link
              class="btn btn-primary"
              :to="'/item/' + item._id"
              tag="a">view</router-link>
              <button class="btn btn-outline-primary" @click="addtocart(item)">Add to cart</button>
            </div>
          </div>
        </div>
      </div>
      <nav aria-label="...">
        <ul class="pagination">
          <li class="page-item">
            <span class="page-link" @click.prevent="page > 1 ? page -- : false">Previous</span>
          </li>
          <!-- <li class="page-item"><a class="page-link" href="#">1</a></li> -->
          <div v-for="i in perpage" :key="i">
            <li class="page-item"> <button @click="choosepage(i)" class="page-link ml-1">{{i}}</button></li>
          </div>
          <li class="page-item">
            <a class="page-link ml-1" href="#" @click.prevent="page < perpage? page ++ : flase">Next</a>
          </li>
        </ul>
      </nav>
      <h1 class="mt-5">Sản phẩm bán chạy</h1>
      <hr style="background-color : white; height : 3px">
      <div class="card-deck d-flex">
        <div v-for="item in banchay" :key="item._id" style="width : 24%" class="ml-1 mb-5 carditem">
          <div class="card mb-3">
            <div class="card-body">
            <h5 class="card-title">{{ item.name }}</h5>
            <hr style="background-color : white;  height : 2px">
            <img :src="item.img" alt="">
            <p class="card-text">Decription ...</p>
            <p class="card-text"><small>Price : {{ item.price}} $ </small></p>
            <router-link
              class="btn btn-primary"
              :to="'/item/' + item._id"
              tag="a">view</router-link>
              <button class="btn btn-outline-primary" @click="addtocart(item)">Add to cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import server from '../services/api';
  export default {
    data() {
      return {
        list:[],
        anh :[
          '../static/1.jpg',
          '../static/2.jpg',
          '../static/3.jpg',
          '../static/4.jpg',
        ],
        count : 0,
        perpage : 1,
        page : 1,
        banchay : [],
        style : '',
        notification : false
      }
    },
    methods: {
      async getdata(){
        // let a = (await axios.get('http://localhost:3333/api/product')).data
        let a = (await server.get('/product')).data
        this.perpage = Math.ceil(a.length / 8)
        this.list = a;
        this.banchay = a.slice(0, 16)
      },
      addtocart(product){
        // this.$store.state.cart.push(item.name);
        if(this.$store.state.cart.length === 0){
          let item = {
            id : product._id,
            name : product.name,
            price : product.price,
            qty : 1
          }
          console.log(typeof(item.id));
          this.$store.state.cart.push(item);
        }else{
          let a = this.$store.state.cart.find(x =>{
            return x.id == product._id
          });
          console.log(a);
          if(a){
            a.qty ++
          }else{
            let item = {
              id : product._id,
              name : product.name,
              price : product.price,
              qty : 1
            }
          this.$store.state.cart.push(item)
          }
        }
        server.put(`/user/${this.$store.state.user._id}`, this.$store.state.cart).then(res => console.log(res)).catch(err => console.log('err'))
        // return axios.post('')
        this.notification = true
        setTimeout(()=>{
          this.notification = false
        }, 2000)
      },
      slide(){
        setInterval(()=>{
          this.count ++
          if(this.count == 4){
            this.count = 0
          }
        }, 3000)
      },
      choosepage(i){
        this.page = i;
      }
    },
    computed: {
      show(){
        return this.list.slice((this.page - 1)*8, this.page * 8);
      }
    },
    created() {
      this.getdata();
      this.slide();
    },
  }
</script>

<style scoped>
.card-body{
  border: 2px solid rgb(252, 251, 251);
  border-radius: 30px;
}
.card-body:hover{
  background-color:rgba(238, 188, 188, 0.5);
}
.card{
  border-radius: 30px;
  background-color:rgba(31, 28, 28, 0.5);
  color: white;
}
.pagination{
  display: flex;
  justify-content: center;
}
h1{
  color: white;
}
.notification{
  background-color: rgba(173, 255, 47, 0.7);
  border-radius: 30px;
  padding: 10px;
  width: 130px;
  border: solid 2px;
  position: -webkit-sticky;
  position: sticky;
  top: 100px
}
</style>