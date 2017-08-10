<template>
  <div class="home"id='tpl'>
    <!--轮播图  -->
    <slider :imgs='list'></slider>
    <!-- 导航栏  -->
    <div class="mui-content">
      <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/news/newsList">
            <span class="mui-icon mui-icon-home"></span>
            <div class="mui-media-body">新闻资讯</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/photo/photoList">
            <span class="mui-icon mui-icon-email">
            </span>
            <div class="mui-media-body">图片分享</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="goods/goodsList">
            <span class="mui-icon mui-icon-chatbubble"></span>
            <div class="mui-media-body">商品购买</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="#">
            <span class="mui-icon mui-icon-location"></span>
            <div class="mui-media-body">留言反馈</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="#">
            <span class="mui-icon mui-icon-search"></span>
            <div class="mui-media-body">视频专区</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="#">
            <span class="mui-icon mui-icon-phone"></span>
            <div class="mui-media-body">联系我们</div>
          </router-link>
        </li>
  
      </ul>
    </div>
  
  </div>
</template>

<script>
import slider from './subcom/slider.vue'
import { Swipe, SwipeItem } from 'mint-ui';
import { Toast } from 'mint-ui';
import common from '../assets/common.js'
export default {
  name: 'home',
  components:{
    slider
  },
  data() {
    return {
      list: []
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      var url=common.apidomain+ '/api/getlunbo';
      this.$http.get(url).then(function (response) {
        var data = response.body;
        if (data.status != 0) {
          Toast('data.message');
          return
        };
        this.list = data.message;
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.mui-content .mui-content ul{
		background-color: #fff;
	}
	.mui-grid-view.mui-grid-9 .mui-table-view-cell{
		border-right:0px;
		border-bottom:0px; 
	}
	.mui-grid-view.mui-grid-9{
		border-top:0px;
    border-left:0px; 
    background: #fff;
  }
  .mui-icon-home:before,
  .mui-icon-email:before,
  .mui-icon-chatbubble:before,
  .mui-icon-location:before,
  .mui-icon-search:before,
  .mui-icon-phone:before{
         content: ""; 
        display: inline-block;
        width: 40px;
        height: 40px;
        background-repeat: round;
  }
  .mui-icon-home:before{
      background-image: url('./../../static/imgs/1.png')
  }
  .mui-icon-email:before{
 background-image: url('./../../static/imgs/2.png')
  }
  .mui-icon-chatbubble:before{
 background-image: url('./../../static/imgs/3.png')
  }
  .mui-icon-location:before{
 background-image: url('./../../static/imgs/4.png')
  }
  .mui-icon-search:before{
 background-image: url('./../../static/imgs/5.png')
  }
  .mui-icon-phone:before{
 background-image: url('./../../static/imgs/6.png')
  }
</style>
