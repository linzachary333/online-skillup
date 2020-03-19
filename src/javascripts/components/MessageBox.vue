<template>
  <div>
    {{ $props.message }}
    <form @submit="createMessage">
      <span>
        名前: <input v-model="$data.name" type="text">
      </span>
      <span>
        テキスト: <input v-model="$data.text" type="text">
      </span>
      <button type="submit">
        送信
      </button>
    </form>

  </div>
</template>

<script>
import VueTypes from 'vue-types';

const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault('Asia/Tokyo');

export default {
  props: {
    message: VueTypes.object.isRequired,
    sendMessage: VueTypes.func.isRequired
  },
  data() {
    return {
      name: '',
      text: '',
    };
  },
  methods: {
    createMessage(e) {
      e.preventDefault();
      const message = {
        name: this.$data.name,
        text: this.$data.text,
        time: moment().format('YYYY/MM/DD HH:mm:ss'),
      };
      this.sendMessage(message);
    }
  }
};
</script>

<style lang="scss" scoped>
//
</style>
