<template>
  <div id="app">
    <!--添加头部  -->
		<div @click="toBack" v-show='isshow' class="back">返回</div>
<mt-header fixed title="vue商城模拟"></mt-header>

  <router-view></router-view>
   
<!--添加底部 -->
<nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" to="/tabbar-with-chat">
				<span class="mui-icon mui-icon-email"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item" to="/shopCar" id="car">
				<span class="mui-icon mui-icon-contact" ><span class="mui-badge"id='num'>{{ab}}</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" to="/tabbar-with-map">
				<span class="mui-icon mui-icon-gear"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>

  </div>
</template>

<script>
import {vm,COUNTSTR} from './assets/vm.js';

export default {
	name: 'app',
	data(){
		return{
			isshow:false,
			ab:0
		}
	},
	created(){
		var that=this;
vm.$on(COUNTSTR,function(input){
		that.ab+=input;
})
	},
	watch:{
			"$route":function(newrouter,oldrouter){
				if(newrouter.fullPath=='/home'){
					this.isshow=false;
				}else{
					this.isshow=true;
				}
			}
	},
	methods:{
		// 返回上一级
		toBack(){
				// 利用$router中的go(-1)返回上一级
				this.$router.go(-1);
		}
	}
}
</script>

<style>
body{
  background: #fff;
}
.router-link-active{
	color:#007aff;
}
.back{
		height: 40px;
		line-height: 40px;
		width: 50px;
		text-align: center;
		color: #fff;
		position: fixed;
		left: 0;top: 0;
		z-index: 200;
}
</style>
