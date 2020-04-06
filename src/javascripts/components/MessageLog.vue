<template>
  <ul class="container" @scroll.native="onScroll">
    <template v-for="message in messages">
      <v-card
        class="textbox"
        :class="{yourMessage: message.userId === userId}"
        shaped
        :key="message.key"
      >
        <v-card-title>{{message.name}}</v-card-title>
        <v-card-subtitle>{{message.time}}</v-card-subtitle>
        <v-card-text class="cardText">
          {{message.text}}
        </v-card-text>
        <VideoContainer
          :messageText="message.text"
        />
      </v-card>
    </template>
  </ul>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import socket from '../utils/socket';
import VueTypes from 'vue-types';
import VideoContainer from './VideoContainer.vue';
import { scrollToBottom } from '../utils/Utils.js';

const debounce = require('lodash/debounce');

export default {
  components: {
    VideoContainer,
  },
  props: {
    userId: VueTypes.string.isRequired,
  },
  data() {
    return {
      messages: [],
    };
  },
  created() {
    socket.on('loadMessages', (messages) => {
      this.$data.messages = messages;
      this.checkIfScrollBarIsAtBottom();
    });
  },
  updated() {
    this.handleMessageLogUpdate();
  },
  methods: {
    ...mapMutations([
      'setSnackbar',
      'setLocalUserSentMessage',
      'setScrollBarAtBottom',
      'incrementUnreadMessagesByOne',
      'resetUnreadMessages',
    ]),
    handleMessageLogUpdate() {
      if (this.getLocalUserSentMessage ||
          this.getScrollBarAtBottom) {
        scrollToBottom();
        this.setScrollBarAtBottom(true);
        this.resetUnreadMessages();
        this.setSnackbar(false);
        this.setLocalUserSentMessage(false);
      } else {
        this.setSnackbar(true);
        if (this.getUnreadMessagesCount < this.$data.messages.length) {
          this.incrementUnreadMessagesByOne();
        }
      }
    },
    scrollIfLocalUserSentMessage() {
      if (this.getLocalUserSentMessage) {
        scrollToBottom();
        this.setScrollBarAtBottom(true);
        this.resetUnreadMessages();
        this.setLocalUserSentMessage(false);
      }
    },
    onScroll: debounce(function() {
      this.checkIfScrollBarIsAtBottom();
      if (this.$data.scrollBarAtBottom) {
        this.setSnackbar(false);
        this.resetUnreadMessages();
      }
    }, 100),
    checkIfScrollBarIsAtBottom() {
      const messageLog = document.getElementById('messageLog');
      const {
        scrollHeight,
        scrollTop,
        clientHeight
      } = messageLog;
      if (scrollHeight - scrollTop === clientHeight) {
        this.setScrollBarAtBottom(true);
      } else {
        this.setScrollBarAtBottom(false);
      }
    },
  },
  computed: {
    ...mapGetters([
      'getUnreadMessagesCount',
      'getLocalUserSentMessage',
      'getScrollBarAtBottom'
    ]),
    checkMessageId: function(messageId) {
      return {
        yourMessage: messageId === this.$props.userId
      };
    },
  }
};
</script>

<style lang="scss" scoped>
.container {
  overflow-y: auto;
  height: 80vh;
}

@media (min-height: 850px) {
  .container {
    height: 88vh;
  }
}

.v-card__title {
  padding-top: 3px;
}

.v-card__subtitle {
  padding-bottom: 0;
}

.textbox {
  margin: 5%;
  width: 35%;
  clear: both;
}

.cardText {
  white-space: pre-line;
}

.yourMessage {
  background-image: linear-gradient(#b7ea6f, #8bd544);
  float: right;
  margin-top: 0;
}

</style>
