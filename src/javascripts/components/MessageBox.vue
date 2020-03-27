<template>
  <div class="outerContainer">
    <form @submit="handleSubmit">
      <v-container class="grey lighten-5 innerContainer">
        <v-row>
          <v-col cols="12" sm="3">
            <v-text-field
              label="名前"
              v-model="$data.name"
              type="text"
            />
            <span class="fieldError">{{$data.error}}</span>
          </v-col>
          <v-col class="col" cols="12" sm="7">
            <v-textarea
              label="テキスト"
              outlined
              rows="3"
              row-height="20"
              v-model="$data.text"
              background-color="white"
              type="text"
            />
          </v-col>
          <v-col class="col" cols="12" sm="2">
            <v-btn
              id="button"
              type="submit"
            >
            送信
            </v-btn>
          </v-col>
        </v-row>

      </v-container>
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
        '名前とテキストのフィールド両方で入力してください';
      } else {
        this.createMessage();
      }
    },
    createMessage() {
      console.log(this.$data.text);
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

.outerContainer {
  position: fixed;
  bottom: 0;
}

.innerContainer {
  padding-top: 0;
  padding-bottom: 0;
}

#button {
  background-color: #8ecee6;
  height: 50%;
  width: 50%;
  margin-left: 25%;
}

.fieldError {
  text-align: center;
  display: block;
  font-weight: bold;
  color: red;
}
</style>
