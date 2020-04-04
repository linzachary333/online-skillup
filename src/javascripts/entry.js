import '../css/base.scss';

import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import store from './store';

import vuetify from '../plugins/vuetify';
import VueYoutube from 'vue-youtube';

Vue.use(Vuex);
Vue.use(VueYoutube);

new Vue({
  vuetify,
  store,
  el: '#app',
  components: { App },
  template: '<app />'
});
