<template>
    <div id="godsNum">
        <div class="subtract" @click="subtract">-</div>
        <div class="num" v-text="count" id="numb"></div>
        <div class="add" @click="add">+</div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            count:1
        }
    },
    created(){

    },
    methods:{
        subtract(){
            this.count--;
            if(this.count<1){
                this.count=1
                return
            }
            this.sendMesg();
        },
        add(){
            this.count++;
            this.sendMesg();
        },
        sendMesg(){
            this.$emit('sendData',this.count);
        }
    }
}
</script>
<style scoped>
div{
    padding: 0;
    margin: 0;
}
    #godsNum{
        display: inline-block;
    }
    #godsNum div{
        display: inline-block;
        border:1px solid rgba(0,0,0,.3);
        height: 25px;
        width: 20px;
        text-align: center;
        line-height: 20px;
        margin-right: 3px;
    }
     #godsNum div:nth-of-type(2){
         width: 30px;

     }
    
</style>
