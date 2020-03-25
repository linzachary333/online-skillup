<template>
  <div>
    <span style="color:red;">{{$data.error}}</span>
    <form @submit="handleSubmit">
      <span>
        名前: <input v-model="$data.name" type="text">
      </span>
      <span>
        テキスト: <input v-model="$data.text" type="text">
      </span>
      <v-btn type="submit">
        送信
      </v-btn>
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
    sendMessage: VueTypes.func.isRequired,
    userId: VueTypes.string.isRequired,
  },
  data() {
    return {
      name: '',
      text: '',
      error: '',
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      if (
        this.$data.name === '' ||
        this.$data.text === ''
      ) {
        this.$data.error =
        '名前とテキストのフィールド両方で何かを入力してください';
      } else {
        this.createMessage();
      }
    },
    createMessage() {
      const message = {
        name: this.$data.name,
        text: this.$data.text,
        time: moment().format('YYYY/MM/DD HH:mm:ss'),
        userId: this.$props.userId
      };
      this.sendMessage(message);

      this.$data.name = '';
      this.$data.text = '';
      this.$data.error = '';
    }
  }
};
</script>

<style lang="scss" scoped>
//
</style>
