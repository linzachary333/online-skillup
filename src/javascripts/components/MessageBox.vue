<template>
  <div @keydown.enter="checkKeys">
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
              @keydown.enter="checkKeys"
            />
          </v-col>
          <v-col class="col" cols="12" sm="2">
            <v-btn
              id="button"
              type="submit"
            >
            送信
            </v-btn>
            <h5 class="reminder">Ctrl+Enterで送信できる</h5>
          </v-col>
        </v-row>
      </v-container>
    </form>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import socket from '../utils/socket';
import VueTypes from 'vue-types';

const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault('Asia/Tokyo');

export default {
  props: {
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
    ...mapMutations([
      'setLocalUserSentMessage',
    ]),
    handleSubmit(e) {
      if (typeof e !== 'undefined') e.preventDefault();
      if (
        this.$data.name === '' ||
        this.$data.text === ''
      ) {
        this.$data.error =
        '名前とテキストのフィールド両方で入力してください';
      } else {
        this.setLocalUserSentMessage(true);
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
      this.$data.text = '';
      this.$data.error = '';
    },
    sendMessage(message) {
      socket.emit('send', message);
    },
    checkKeys(e) {
      if (e.keyCode !== 13) return;
      if (e.metaKey === true || e.ctrlKey === true) {
        e.preventDefault();
        this.handleSubmit(e);
      }
    },
  },
  computed: {
    ...mapGetters([
      'getUnreadMessagesCount',
    ]),
  }
};
</script>

<style lang="scss" scoped>
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

.reminder {
  text-align: center;
  padding-top: 10%;
}
</style>
