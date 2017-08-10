<template>
  <div class="home"id='tpl' >
    <div class="car_goods" v-for="(item,index) in list">
      <mt-switch v-model="value[index]" class="switch"></mt-switch>
      <div class="g_img">
        <img :src="item.thumb_path" :alt="item.title">
      </div>
      <div class="g_msg">
        <h5>{{item.title}}</h5>
        <p><span>￥{{item.sell_price}}</span><carinputNumber :carBuyNum='item.cou' :goodsid='item.id' 
          v-on:carsendData="getInputNum"
        ></carinputNumber><button @click="delData(item.id,index)">删除</button></p>
      </div>
    </div>
    <!--计算总价  -->
    <div class="money">
       <div class="price">
          <p>总计(不含运费)：</p>
          <p>已经勾选商品<span>{{totalNum}}</span>件，总价￥<span>{{totalPrice}}</span></p>
       </div>
        <div class="btn">
          <mt-button type="danger" size='small'>去结算</mt-button>
        </div>
    </div>
  <!-- {{list}} -->
  </div>
</template>

<script>

import { Switch } from 'mint-ui';
import carinputNumber from './../subcom/carinputNumber.vue' 
import common from './../../assets/common.js';
import Toast from 'mint-ui';
import {getGodsObj,updateData,removeItem} from './../../assets/localStroage.js';
export default {
  name:'home',
  components:{
    carinputNumber
  },
  data () {
    return {
        value:[false],
        list:[],
        totalPrice:0

    }
  },
  created(){
      this.getGoods()
  },
  computed:{//计算总价
    totalNum(){
      // 逻辑：筛选出value中选中状态的个数就是要计算的商品的个数；
      var totalArr=this.value.filter(function(item){return item==true});
          // 开始计算总价：每件商品的个数*单价（item.sell_price）;

          var price=0;
       this.value.forEach((item,index)=>{  
          if(item){
           price+= this.list[index].cou*this.list[index].sell_price;
          }
       })
        this.totalPrice=price;

      return totalArr.length;
    }
  },
  methods:{
    // 删除购物车中的商品
    delData(id,index){
// 在删除数据的时候，开关中的值要删掉
// localstroage中的数据也要删掉；
// list中的数据也要删掉
this.list.splice(index,1);
this.value.splice(index,1);
removeItem(id);

    },


    // 得到购物车更新的数据
    getInputNum(obj){
// 更新localstroage中的数据
        updateData(obj);
      // 更新localstroage 中的数据之后，要重新更新list中的数据
        for(var i=0;i<this.list.length;i++){
          if(this.list[i].goodsid=obj.goodsid){
              if(obj.type=='add'){
               
                this.list[i].cou++;
                 
                break;
              }else{
                this.list[i].cou--;
                break;
              }
          }
        }
    },
    getGoods(){
      //在获取购物车列表之前，首先将请求的数据拿到 api中要传的值首先拿到（getGodsObj）
      var obj =getGodsObj();
      // console.log(obj)
      var idStr='';
      for(var key in obj){
        idStr+=key+',';
      }
      idStr=idStr.substring(0,idStr.length-1);
      var url='http://182.254.146.100:8899/api/goods/getshopcarlist/'+idStr;
      this.$http.get(url).then(function(res){
        var data=res.body;
        if(data.status!=0){
          Toast(data.message);
          return
        };
        data.message.forEach(function(el) {
          el.cou=obj[el.id]
        });
        this.list=data.message;
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#tpl{
  padding: 5px;
}
 .car_goods{
   display: flex;
    width: 100%;
    height: 90px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-top: 5px;
 }
  .switch{
    width: 55px;
  }
  .g_img{
  width: 70px;
  /* margin-left: 10px; */
  /* margin-right: 10px; */
  }
   .g_img img{
     margin-top: 10px;
   }
  .g_msg{
    flex: 1;
    box-sizing: border-box;
  }
  .g_msg h5{
    color: skyblue;
    font-weight: 600;
    margin-bottom: 5px;
  }
  .g_msg p{
    margin-top: 20px;

  }
    .g_msg p span{
      color: red;
      margin-right: 5px;
    }
     .g_msg p button{
     padding:2px  5px;
     background: #eee;
      font-size: 12px;
      margin-left: 5px;
     }
     .money{
       width: 100%;
       height: 80px;
       background: #eee;
       border-radius: 5px;
       margin-top: 10px;
       padding: 10px 5px;
       box-sizing: border-box;
       display: flex;

     }
     .money .price{
       flex: 1;
     }
  .money .btn{
    width: 80px;
    margin-top: 15px;
  }
  .money p{
    font-size: 12px;
    color: #222;
  }
</style>
