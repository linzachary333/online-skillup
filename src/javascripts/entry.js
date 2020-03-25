import '../css/base.scss';

import Vue from 'vue';
import App from './App.vue';
import vuetify from '../plugins/vuetify';

new Vue({
  vuetify,
  el: '#app',
  components: { App },
  template: '<app />'
});
