import Vue from 'vue';
Vue.config.productionTip = false;
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Home from './home';

Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
    message: 'hello world',
  },
  render: h => h(Home),
});
