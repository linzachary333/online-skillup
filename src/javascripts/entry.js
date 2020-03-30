import '../css/base.scss';

import Vue from 'vue';
import App from './App.vue';
import vuetify from '../plugins/vuetify';
import VueYoutube from 'vue-youtube';

Vue.use(VueYoutube);

new Vue({
  vuetify,
  el: '#app',
  components: { App },
  template: '<app />'
});
