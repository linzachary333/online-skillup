<template>
  <v-app>
    <div>
      <Navbar
        :getParticipantList="getParticipantList"
      />
      <MessageLog
        id="messageLog"
        :messages="messages"
        :userId="userId"
        @messageLogUpdated="handleMessageLogUpdate"
        @scroll.native="onScroll"
      />
      <div class="outerContainer">
        <v-snackbar
          class="snackbar"
          v-model="snackbar"
          :timeout="0"
          @click="clickedSnackbar"
        >
          {{unreadMessages}} unread message(s).
          <v-icon color="blue">mdi-close</v-icon>
        </v-snackbar>
        <MessageBox
          class="messageBox"
          :sendMessage="sendMessage"
          :userId="userId"
          @messageSent="localUserHasSentMessage"
        />
      </div>
    </div>
  </v-app>
</template>

<script>
import socket from './utils/socket';
// components
import MessageBox from './components/MessageBox.vue';
import MessageLog from './components/MessageLog.vue';
import Navbar from './components/Navbar.vue';

const debounce = require('lodash/debounce');

export default {
  components: {
    MessageBox,
    MessageLog,
    Navbar
  },
  data() {
    return {
      messages: [],
      participants: [],
      userId: '',
      localUserSentMessage: false,
      snackbar: false,
      unreadMessages: 0,
      scrollBarAtBottom: false,
    };
  },
  created() {
    socket.on('updateParticipants', (participants) => {
      this.$data.participants = participants;
    });

    socket.on('loadMessages', (messages) => {
      this.$data.messages = messages;
      this.checkIfScrollBarIsAtBottom();
    });

    socket.on('loadUserId', (userId) => {
      this.$data.userId = userId;
    });
  },
  methods: {
    sendMessage(message) {
      socket.emit('send', message);
    },
    scrollToBottom() {
      const messageLog = document.getElementById('messageLog');
      messageLog.scrollTop = messageLog.scrollHeight;
      this.$data.scrollAtBottom = true;
      this.$data.unreadMessages = 0;
    },
    checkIfScrollBarIsAtBottom() {
      const messageLog = document.getElementById('messageLog');
      const {
        scrollHeight,
        scrollTop,
        clientHeight
      } = messageLog;
      if (scrollHeight - scrollTop === clientHeight) {
        this.$data.scrollBarAtBottom = true;
      } else {
        this.$data.scrollBarAtBottom = false;
      }
    },
    handleMessageLogUpdate() {
      if (this.$data.localUserSentMessage ||
          this.$data.scrollBarAtBottom) {
        this.scrollToBottom();
        this.$data.snackbar = false;
        this.$data.localUserSentMessage = false;
      } else {
        this.$data.snackbar = true;
        if (this.$data.unreadMessages < this.$data.messages.length) {
          this.$data.unreadMessages++;
        }
      }
    },
    localUserHasSentMessage() {
      this.$data.localUserSentMessage = true;
    },
    clickedSnackbar() {
      this.$data.snackbar = false;
      this.$data.scrollBarAtBottom = true;
      this.scrollToBottom();
    },
    onScroll: debounce(function() {
      this.checkIfScrollBarIsAtBottom();
      if (this.$data.scrollBarAtBottom) {
        this.$data.snackbar = false;
        this.$data.unreadMessages = 0;
      }
    }, 100),
  },
  computed: {
    getParticipantList: function() {
      let participantList = '';
      for (const participant of this.$data.participants) {
        participantList += `${participant.user}\n`;
      }
      return participantList;
    }
  }
};
</script>

<style lang="scss" scoped>
.preformatted {
  white-space: pre;
}

.sample {
  color: $red;
}

.messageBox {
  width: 100%;
}

.outerContainer {
  position: fixed;
  bottom: 0;
  z-index: 2;
  width: 100%;
}

.snackbar {
  position: inherit;
  transform: translateY(-100%);
  bottom: auto;
  cursor: pointer;
}

.snackbar p {
  text-align: center;
}
</style>
