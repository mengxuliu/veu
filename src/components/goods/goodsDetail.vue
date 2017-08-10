<template>
    <div id="tpl" class="goodsDetail">
        <!--轮播图  -->
        <div class="godSlide">
            <slider :imgs='imgList'></slider>
        </div>
        <div class="buyGoods">
            <h4>{{buyList.title}}</h4>
            <p class="line"></p>
            <ul>
                <li>
                    <p class="price">
                        <span>市场价：
                            <del>￥{{buyList.market_price}}</del>
                        </span>
                        <span>销售价：
                            <b class="nowPrice">￥{{buyList.sell_price}}</b>
                        </span>
                    </p>
                </li>
                <li>
                    <!--获取子组件传进来的值  -->
                    <div class="buyNum">购买数量：
                        <inputNumber v-on:sendData='getData'></inputNumber>
                        <transition @before-enter='beforeEnter' @enter='enter' @after-enter='afterEnter'>
                            <div class="ball" v-if="isshow"></div>
                        </transition>
                    </div>
                </li>
                <li>
                    <mt-button type="danger" size="small">立即购买</mt-button>
                    <mt-button type="primary" size="small" @click="toShopCar">加入购物车</mt-button>
                </li>
            </ul>
        </div>
        <div class="goodsParamt">
            <h4>商品参数</h4>
            <p class="line"></p>
            <div class='info'>
                <ul>
                    <li>商品货号：{{buyList.goods_no}}</li>
                    <li>库存情况：{{buyList.stock_quantity}}</li>
                    <li>上架时间：{{buyList.add_time | dataFlt('YYYY-MM-DD HH:mm:ss')}}</li>
                </ul>
            </div>
        </div>
        <div class="godsInfo">
            <router-link v-bind="{to:'/goods/goodsInfo/'+id}">
                <mt-button type="danger" size="large" plain>图文介绍</mt-button>
            </router-link>
            <router-link v-bind="{to:'/goods/goodsCommont/'+id}">
                <mt-button type="primary" size="large" plain>商品评论</mt-button>
            </router-link>
        </div>
    </div>
</template>
<script>
import inputNumber from './../subcom/inputNumber.vue'    //购买数量子插件
import slider from './../subcom/slider.vue'             //导入轮播图
import { Toast } from 'mint-ui';                        //mint-ui
import common from './../../assets/common.js';          //api
import { vm, COUNTSTR } from './../../assets/vm.js';
import { setItem, objValue } from './../../assets/localStroage.js';

export default {
    name: 'goodsDetail',
    components: {
        slider,
        inputNumber
    },
    data() {
        return {
            isshow:false,
            id: 0,
            imgList: [],
            buyList: {},      //
            buyNum: 1,        //购买数量
            transY:0,
            transX:0
        }
    },
    created() {
        this.id = this.$route.params.id;
        this.getSlider();
        this.getBuyGoods()
    },
    methods: {
       
        // 将子组件的值赋给父组件
        getData(input) {
            this.buyNum = input;
        },
        // 购物车
        toShopCar(e) {
            vm.$emit(COUNTSTR, this.buyNum);//将购买数量传值给公共的父组件，注册一个COUNTSTR 事件
            objValue.goodsid = this.id;
            objValue.buyNum = this.buyNum;
            // 将商品数量和商品id 存数到localstroage中
            setItem(objValue);
            this.isshow=!this.isshow;
            var a=document.querySelector('#car');
            var b=document.querySelector('#numb');
             this.transX=(a.offsetWidth/2+a.offsetLeft)-(b.offsetLeft+b.offsetWidth/2);
            
            var winH=window.screen.height;
           console.log( winH)
            var e = event || window.event;
           
            console.log(e.clientY)
            // var t=document.body.scrollTop;
            this.transY=winH-e.clientY;
        },
        //         购买信息
         beforeEnter(el){    
            el.style.transform='translate(0,0)';
        },
        enter(el,doen){
            el.offsetWidth;
            el.style.transform='translate('+this.transX+'px,'+this.transY+'px)';
            doen()
        },
        afterEnter(){
            this.isshow=!this.isshow;
        },
        getBuyGoods() {
            var url = common.apidomain + '/api/goods/getinfo/' + this.id;
            this.$http.get(url).then(function (res) {
                var data = res.body;
                if (data.status != 0) {
                    Toast(data.message);
                    return
                }
                this.buyList = data.message[0];
            })
        },

        // 轮播图
        getSlider() {
            var url = 'http://182.254.146.100:8899/api/getthumimages/' + this.id;
            this.$http.get(url).then(function (res) {
                var data = res.body;
                console.log(data)
                if (data.status != 0) {
                    Toast(data.message);
                    return
                };
                this.imgList = data.message;
            })
        }
    }
}
</script>
<style scoped>
#tpl {
    padding: 3px;
}

.line {
    width: 100%;
    border-bottom: 2px solid rgba(0, 0, 0, .3);
}

.buyGoods,
.godSlide,
.goodsParamt,
.godsInfo {
    margin-top: 5px;
    width: 100%;
    border: 1px solid rgba(0, 0, 0, .3);
    padding: 5px;
    border-radius: 5px;
}

.buyGoods h4 {
    font: 600 16px "Helvetica Neue', Helvetica, sans-serif";
    color: skyblue;
}

.buyGoods li {
    margin-top: 5px;
}

.buyGoods .price {
    font-size: 12px;
}

.buyGoods .price span {
    margin-right: 20px;
}

.buyGoods .price .nowPrice {
    font-size: 16px;
    color: red;
}

.buyGoods .buyNum {
    font-size: 14px;
    color: #999;
}

.info ul li {
    font-size: 14px;
    color: #999;
    line-height: 24px;
    margin-left: 20px;
}

.godsInfo a {
    display: block;
    margin-bottom: 5px;
}
.buyNum{
    position: relative
}
.ball{
    width: 20px;
    height: 20px;
    background: red;
    border-radius: 50%;
    position: absolute;
    left: 100px;
    top: 20px;
    transition: all .8s ease;
    z-index: 2000;
}
</style>
