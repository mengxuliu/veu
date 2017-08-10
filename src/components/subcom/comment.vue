<template>
    <div class="comment" id="tpl">
        <div id="postcontent">
            <h4>提交评论{{id}}</h4>
            <p class="line"></p>
            <textarea cols="10" rows="2" placeholder="请输入评论信息" v-model="comContent"></textarea>
            <mt-button type="primary" size="large" @click='postContent'>发表</mt-button>
            <h4>评论信息</h4>
            <div v-for="(item,index) in list" class="comList" id="dedailComment">
                <div class="title">
                    <span>来自：{{item.user_name}}</span>
                    <span>{{item.add_time | dataFlt('YYYY-MM-DD HH:mm:ss')}}</span>
                    <span>第{{index+1}}楼</span>
                </div>
                <ul class="mui-table-view">
                    <li v-text="item.content" class="mui-table-view-cell">
    
                    </li>
    
                </ul>
            </div>
            <mt-button type="danger" size="large" plain @click="getMore">查看更多</mt-button>
        </div>
    
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
import common from './../../assets/common.js'
export default {
    name: 'comment',
    data() {
        return {
            comContent: '',
            list: [],
            pageindex: 1
        }
    },
    created() {
        this.getCommentList(this.pageindex);
    },
    methods: {
        getMore() {
            this.pageindex++;
            this.getCommentList(this.pageindex);
        },
        // 提交评论 
        postContent() {
            if (this.comContent.trim().length <= 0) {
                Toast('请输入评论内容');
                return;
            }
            var url = common.apidomain + '/api/postcomment/' + this.id;
            var head = { emulateJSON: true };
            var data = { content: this.comContent };
            this.$http.post(url, data, head).then(function (res) {
                Toast(res.body.message)
            });
            this.list = [{
                user_name: '大傻子',
                content: this.comContent,
                add_time: new Date()
            }].concat(this.list);
            this.comContent = '';
        },
        getCommentList(pageindex) {
            pageindex = pageindex || 1;
            var url = common.apidomain + '/api/getcomments/' + this.id + '?pageindex=' + pageindex;
            this.$http.get(url).then(function (res) {
                var data = res.body;
                if (data.status != 0) {
                    Toast(data.message)
                }
                this.list = this.list.concat(data.message);
            })
        }
    },
    props: ['id']
}
</script>
<style scoped>
textarea {
    margin: 0;
    padding: 0;
    resize: none;
    padding: 5px;
    font-size: 14px;
}

.line {
    border-bottom: 1px solid #ccc;
    margin-top: 5px;
}

#dedailComment .title {
    margin-top: 0px;
    padding: 5px;
    color: #6d6d72;
    font-size: 15px;
    background: rgba(0, 0, 0, .3);
}
li{
    color: #999;
    font-size: 16px;
}
.title span:nth-of-type(3) {
    float: right;
}

.title span:nth-of-type(2) {
    text-align: center;
}

.title span:nth-of-type(1) {
    float: left;
}
</style>
