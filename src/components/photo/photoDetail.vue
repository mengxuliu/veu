<template>
    <div id="tpl">
        <div class="p_title">
             <h4>{{cont.title}}</h4> 
            <p>{{cont.add_time | dataFlt('YYYY-MM-DD HH:mm:ss')}}点击数:{{list.click}}</p>
            <p class="line"></p>
        </div>
        <div class="mui-content">
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-4" v-for="(item,index) in list">
                     <img class="preview-img"  :src="item.src" height="100" @click="$preview.open(index, list)" >
                </li>
            </ul>
        </div>
         <div v-html="cont.content"></div> 
    <!--评论组件  -->
    <comment :id='id'></comment>
    
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
import common from './../../assets/common.js';
import comment from './../subcom/comment.vue';
export default {
    components: {
        comment
    },
    data() {
        return {
            id: 0,
            cont: [],
             list: {}
        }
    },
    created() {
        this.id = this.$route.params.id;
        this.getImgList();
        this.getImgContent()
    },
    methods: {
        getImgContent() {
            var url = common.apidomain + '/api/getimageInfo/' + this.id;
            this.$http.get(url).then(function (res) {
                var data = res.body;
                if (data.status != 0) {
                    Toast(data.message);
                    return
                };
                this.cont = data.message[0]
            })
        },
        getImgList() {
            var url = 'http://182.254.146.100:8899/api/getthumimages/' + this.id;
            this.$http.get(url).then(function (res) {
                var data = res.body;
                if (data.status != 0) {
                    Toast(data.message);
                    return
                };
                data.message.forEach(function(item) {
                    item.h=200;
                    item.w=300
                });
                this.list = data.message
            })
        }
    }
}
</script>
<style scoped>
 p {
     margin: 0;
     padding: 0;
 }

 #tpl h4 {
     padding-top: 10px;
     color: #0092ff;
 }

 #tpl .line {
     border-bottom: 1px solid #ccc;
 }
</style>
