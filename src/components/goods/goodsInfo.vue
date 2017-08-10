<template>
  <div id="tpl">
  
        <h4>{{list.title}}</h4>
        <div v-html="list.content">
        </div>

  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import common from './../../assets/common.js';
export default {
  data(){
      return{
          id:0,
        list:{}
      }
  },
  created(){
        this.id=this.$route.params.id;
        this.getInfo()
  },
  methods:{
        getInfo(){
            var url=common.apidomain+'/api/goods/getdesc/'+this.id;
            this.$http.get(url).then(function(res){
                var data=res.body;
                console.log(data)
                if(data.status!=0){
                Toast(data.message);
                return
              };
              this.list=data.message[0];
            })
        }
  }
}
</script>
<style scoped>
  #tpl h4{
    color: skyblue;
  }
</style>
