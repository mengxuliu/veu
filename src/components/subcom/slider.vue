<template>
  <div>

<mt-swipe :auto="2000">
      <mt-swipe-item v-for="item in imgs">
        <img :src="item.img">
      </mt-swipe-item>
 </mt-swipe>

  </div>
</template>
<script>
export default {
    props:['imgs'],
  data(){
   return{
       
   }   
  },
  created(){

  },
  methods:{

  }
}
</script>
<style scoped>
.mint-swipe {
  /* width: 100%; */
   height: 210px; 
}
.mint-swipe img{
  width: 100%;
  height: auto;
}
.mint-swipe-item {
  width: 100%;
   height: 300px; 
  /* background: red; */
}
</style>
