import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import components from './components'; // 自定义模板
import preventReClick from './utils/plugins'
import * as _ from 'lodash'
import * as api from './api/index';

import 'element-ui/lib/theme-chalk/index.css';
import './assets/iconfont/iconfont';
import './assets/iconfont/iconfont.css';
import './tools/extend';

Vue.use(ElementUI);
Vue.use(components);
Vue.use(preventReClick);
Vue.prototype.$apiHttp = api;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
