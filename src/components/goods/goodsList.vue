<template>
    <div id="tpl">
        <div class="mui-content">
            <ul class="mui-table-view mui-grid-view">
                <li v-for="item in list" class="mui-table-view-cell mui-media mui-col-xs-6">
                    <router-link v-bind='{to:"/goods/goodsDetail/"+item.id}'>
                         <img class="mui-media-object" :src="item.img_url"> 
                        <div class="shopCont">
                            <h6>{{item.title}}</h6>
                            <div class="msg">
                               <p> 上架时间:{{item.add_time | dataFlt('YYYY-MM-DD')}}<h6 class="left">剩余{{item.stock_quantity}}件</h6></p>

                                <p><span>￥{{item.sell_price}}</span><del>￥{{item.market_price}}</del></p>
                                <p class="num"></p>
                            </div>
                        </div>
                    </router-link>
                </li>
    
            </ul>
        </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
import common from './../../assets/common.js';
export default {
    data(){
        return{
            list:[]
        }
    },
    created(){
        this.getGodsList()
    },
    methods:{
        getGodsList(){
            var url=common.apidomain+'/api/getgoods?pageindex=1';
            this.$http.get(url).then(function(res){
                var data=res.body;
                if(data.status!=0){
                Toast(data.message);
                return
              };
              this.list=data.message;
            })
        }
    }
}
</script>
<style scoped>
.shopCont{
    width: 100%;
    background: #eee;
    padding: 0;
    margin: 0;
}
ul{
    padding: 0;
    margin: 0;
}
li{
    padding: 0;
    margin: 0;
}
.mui-table-view.mui-grid-view .mui-table-view-cell{
    padding: 0px;
    margin: 0;
    border:1px solid rgba(0,0,0,.3)
}
.mui-table-view.mui-grid-view{
    padding: 0;
}
.mui-table-view.mui-grid-view .mui-table-view-cell > a:not(.mui-btn){
    margin: 0;
}
.shopCont .msg{
    font-size: 12px;
    text-align: left;

}
.msg{
    clear: both;
}
.msg p{
    line-height: 24px;
    font-size: 12px;
}
.msg p span{
margin-right: 5px;
}
.msg p span:nth-of-type(1){
    font-size: 16px;
    color: red;
}


</style>
