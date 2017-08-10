<template>
  <div id="tpl">
    <commont :id="id"></commont>
      
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import common from './../../assets/common.js';
import commont from './../subcom/comment.vue';
export default {
  components:{
      commont
  },
  data(){
      return{
            id:0
      }
  },
  created(){
      this.id=this.$route.params.id
  }

}
</script>
<style scoped>

</style>
