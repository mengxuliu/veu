<template>
  <div id="tpl" class="newList">
    <ul class="mui-table-view">
				<li v-for="item in list" class="mui-table-view-cell mui-media">
					<router-link v-bind='{to:"/news/newsDetail/"+item.id}'>
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							 <p class="tit">{{item.title}}</p> 
							<p class='mui-ellipsis zhayao' v-text="item.zhaiyao"></p>
                            <div class="time">
                                    <span>{{item.add_time | dataFlt('YYYY-MM-DD HH:mm:ss') }}</span>
                                    <span class="click">{{item.click}}</span>
                            </div>
						</div>
					</router-link>
				</li>
			</ul>

  </div>
</template>

<script>
import { Toast } from 'mint-ui';
import common from './../../assets/common.js'
export default {
  name:'newList',
  data(){
      return{
          list:[
              
          ]
      }
  },
created(){
    alert(123)
    this.getNewsList()
},
methods:{
    getNewsList(){
        var url=common.apidomain+'/api/getnewslist';
        this.$http.get(url).then(function(res){
            var data=res.body;
            if(data.status!=0){
                Toast('data.message');
                return
            };
            this.list=data.message;
        })
    }
}





}
</script>
<style scoped>
.mui-table-view .mui-media-object{
    width: 80px;
    height: 80px;
    max-width: 80px;
    line-height: 80px;
}
.time{
    margin-top: 1.5em;
    font-size: 14px;
    color: #26a2ff;
}
.click{
    float: right;
    margin-right: 3px;
}
.mui-ellipsis{
    font-size: 12px;
}
.tit{
    font-size: 14px;
    color: #000;
}

</style>
