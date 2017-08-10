<template>
    <div  class="newsDetail" id="tpl">
            <div v-for="item in msg" class="msgs">
                <div class="titles">
                  <h4>{{item.title}}</h4>
                  <p><span>{{item.add_time | dataFlt('YYYY-MM-DD HH:mm:ss')}}</span><span class="click">点击量：{{item.click}}</span></p>
                </div>
                <div v-html="item.content" class="cont"></div>
            </div>

           <comment :id="id"></comment> 


    </div>

</template>

<script>
import { Toast } from 'mint-ui';
import common from './../../assets/common.js';
// 导入评论组件
import comment from './../subcom/comment.vue';
export default {
  name:'newsDetail',
  data(){

    return{
      msg:'',
      id:0,
    }
  },
  components:{
      comment
  },
  created(){
    this.id=this.$route.params.id;
    this.getDetail()
  },
  methods:{
    getDetail(){
      var url=common.apidomain+'/api/getnew/';
      this.$http.get(url+this.id).then(function(res){
              var data=res.body;
              if(data.status!=0){
                Toast(data.message);
                return
              };
              this.msg=data.message;
      })
    }
  }
}
</script>
<style scoped>
.msgs{
  padding: 5px;
}
.titles{
  height: 80px;
  width: 100%;
  border-bottom: 1px solid #ccc;
}
h4{
  color: #0094ff;
  line-height: 24px;
}
p{
  width: 100%;
  font-size: 14px;
}
.click{
  float: right;
  margin-right: 10px;
}
 .cont{
   margin-top: 10px;
   font-size: 16px;
 }


</style>
