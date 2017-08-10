import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home.vue'
import shopCar from '@/components/shopCar/shopCar.vue'
import newsList from '@/components/news/newsList.vue'
import newsDetail from '@/components/news/newsDetail.vue'
import photoList from '@/components/photo/photoList.vue'
import photoDetail from '@/components/photo/photoDetail.vue'
import goodsList from '@/components/goods/goodsList.vue'
import goodsDetail from '@/components/goods/goodsDetail.vue'
import goodsInfo from '@/components/goods/goodsInfo.vue'
import goodsCommont from '@/components/goods/goodsCommont.vue'
Vue.use(Router)
export default new Router({
  linkActiveClass:'mui-active',
  routes: [
    {path: '/',component: home},
    {path: '/home',component: home},
    {path: '/shopCar',component: shopCar},
    {path:'/news/newsList',component:newsList},
    {path:'/news/newsDetail/:id',component:newsDetail},
    {path:'/photo/photoList',component:photoList},
    {path:'/photo/photoDetail/:id',component:photoDetail},
    {path:'/goods/goodsList',component:goodsList},
    {path:'/goods/goodsDetail/:id',component:goodsDetail},
    {path:'/goods/goodsInfo/:id',component:goodsInfo},
    {path:'/goods/goodsCommont/:id',component:goodsCommont},
  ]
})
