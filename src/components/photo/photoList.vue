<template>
  <div id="tpl" class="photoList">
    <div class="photoTit">
        <ul class="ulNav"v-bind='{style:"width:"+ulWidth+"px"}' >
            <li>全部</li>
            <li v-for="item in navList" @click="getImgList(item.id)">{{item.title}}</li>
        </ul>
    </div>
    <div class="img">
        <ul class="ulImg">
            <li v-for="item in list">
                <router-link v-bind="{to:'/photo/photoDetail/'+item.id}">
                    <img v-lazy="item.img_url">
                    <div class="ulImgCont">
                        <h5>{{item.title}}</h5>
                        <p>{{item.zhaiyao}}</p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
  </div>
</template>
<script>
import { Lazyload } from 'mint-ui';
import { Toast } from 'mint-ui';
import common from './../../assets/common.js';
export default {
  name:'photoList',
  data(){
      return{
        ulWidth:320,
        navList:[],
        list:[]
      }
  },
  created(){
    this.getNav();
    var all=0;
    this.getImgList(0)
  },
  methods:{
      getImgList(catId){
        catId=catId||0;
        var url='http://182.254.146.100:8899/api/getimages/'+catId;
        this.$http.get(url).then(function(res){
            var data=res.body;
            if(data.status!=0){
                Toast('data.message');
                return
              };
              this.list=data.message;
              console.log(data)
        })
      },
    getNav(){
        var url=common.apidomain+'/api/getimgcategory';
        this.$http.get(url).then(function(res){
            var data=res.body;
            if(data.status!=0){
                Toast('data.message');
                return
              };
              this.navList=data.message;
              var liwidth=84;
              var count=data.message.length+1;
              this.ulWidth=liwidth*count
        })
    }
  }
}
</script>
<style scoped>
   .photoTit{
       min-width: 320px;
       width: 100%;
       /* height: 40px; */
    overflow-x: auto;
    font-size: 16px;
    border-bottom: 1px solid #ccc;
   } 
.ulNav{
     clear: both; 
}
::-webkit-scrollbar {
        width: 0px;
    }
    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(255,255,211,0);
        border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: rgba(0,0,0,0);
        -webkit-box-shadow: inset 0 0 6px rgba(255,125,232,0);
    }
.ulNav li{
    float: left;
    list-style: none;
     padding:8px 10px 0; 
    text-align: center;
    color: #0094ff;
}
image[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}
 .ulImg{
    width: 100%;
} 
.ulImg li{
    list-style: none;
    position: relative;
}
img{
    width: 100%;
    height: 300px;
    background: red;
}
.ulImgCont{
    position: absolute;
    left: 0 ;
    bottom: 2px;
    background: rgba(0,0,0,.3);
    color:#FFF;
    padding: 5px;
}
</style>
