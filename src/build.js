/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	// The Vue build version to load with the `import` command
	// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
	import Vue from 'vue'
	import App from './App'
	import router from './router'
	import mintui from './../node_modules/mint-ui'
	import 'mint-ui/lib/style.min.css'
	import './../static/mui/css/mui.css'
	import vueResource from './../node_modules/vue-resource'
	Vue.use(vueResource)
	Vue.config.productionTip = false
	Vue.use(mintui);
	/* eslint-disable no-new */
	// 导入全局的css样式
	import './../static/css/site.css';
	// 使用momentjs这个日期格式化类库实现日期的格式化功能
	import moment from './../node_modules/moment';
	Vue.filter('dataFlt',function(input,fmtstring){
	   return moment(input).format(fmtstring);
	})
	  // 引入vue图片预览插件
	  import vuePreview from 'vue-preview';
	  Vue.use(vuePreview);
	new Vue({
	  el: '#app',
	  router,
	  template: '<App/>',
	  components: { App },
	  // render:c=>c(App)
	})


/***/ }
/******/ ]);