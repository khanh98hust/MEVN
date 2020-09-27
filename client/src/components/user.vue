<template>
  <div class="container">
    <h1>Search di babe</h1>
    <form >
      <div class="form-group d-flex">
        <input
          v-model="textsearch"
          type="text"
          class="form-control" 
          name="q"
          aria-describedby="helpId" 
          placeholder="timkiem...">
        <button class="btn btn-primary ml-5" @click.prevent="search">Search</button>
      </div>
      <h1>Khoảng : {{ketqua}} kết quả ({{ time }} giây)</h1>
      <option v-for="item in show" :key="item._id">{{ item.name }}</option>
    </form>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    data() {
      return {
        textsearch : '',
        check : false,
        list : [],
        show : [],
        time : 0,
        ketqua : 0
      }
    },
    methods: {
      async getdata(){
        let a = (await axios.get('http://localhost:9367/api/product')).data
        this.list = a
      },
      search(){
        return this.$router.push('/test')
      },
      loaibodau(str) {
        var AccentsMap = [
          "aàảãáạăằẳẵắặâầẩẫấậ",
          "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
          "dđ", "DĐ",
          "eèẻẽéẹêềểễếệ",
          "EÈẺẼÉẸÊỀỂỄẾỆ",
          "iìỉĩíị",
          "IÌỈĨÍỊ",
          "oòỏõóọôồổỗốộơờởỡớợ",
          "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
          "uùủũúụưừửữứự",
          "UÙỦŨÚỤƯỪỬỮỨỰ",
          "yỳỷỹýỵ",
          "YỲỶỸÝỴ"    
        ];
        for (var i=0; i<AccentsMap.length; i++) {
          var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
          var char = AccentsMap[i][0];
          str = str.replace(re, char);
        }
        return str;
      }
    },
    created() {
      this.getdata();
    },
    watch: {
      textsearch(){
        var start = new Date().getTime();
        if(this.textsearch == ''){
          this.show = []
        }else{
          let map = [];
          for(let item of this.list){
            if(this.loaibodau(item.name).toLowerCase().match(this.loaibodau(this.textsearch).toLowerCase())){
              map.push(item)
            }
          }
          this.$store.state.list = map
          this.ketqua = map.length;
          this.show = map.slice(0 ,5)
          console.log(map);
        }
        // let time = console.timeEnd('mytimer')
        // console.log('thoi gian', time);
        var end = new Date().getTime();
        var time = (end - start) / 1000;
        this.time = time
      }
    },
  }
</script>

<style scoped>
.container{
  height: 80vh;
  color: white;
  margin-top: 40px;
}
</style>