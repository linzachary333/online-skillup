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
        @messageLogUpdated="scrollIfUserSentMessage"
      />
      <MessageBox
        class="messageBox"
        :sendMessage="sendMessage"
        :userId="userId"
        @messageSent="userHasSentMessage"
      />
    </div>
  </v-app>
</template>

<script>
import socket from './utils/socket';
// components
import MessageBox from './components/MessageBox.vue';
import MessageLog from './components/MessageLog.vue';
import Navbar from './components/Navbar.vue';

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
      userSentMessage: false,
    };
  },
  created() {
    socket.on('updateParticipants', (participants) => {
      this.$data.participants = participants;
    });

    socket.on('loadMessages', (messages) => {
      this.$data.messages = messages;
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
    },
    userHasSentMessage() {
      this.$data.userSentMessage = true;
    },
    scrollIfUserSentMessage() {
      if (this.$data.userSentMessage) {
        this.scrollToBottom();
        this.$data.userSentMessage = false;
      }
    }
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
</style>
