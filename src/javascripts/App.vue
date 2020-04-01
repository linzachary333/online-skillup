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
        @messageLogUpdated="scrollIfLocalUserSentMessage"
      />
      <MessageBox
        class="messageBox"
        :sendMessage="sendMessage"
        :userId="userId"
        @messageSent="localUserHasSentMessage"
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
      localUserSentMessage: false,
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
    localUserHasSentMessage() {
      this.$data.localUserSentMessage = true;
    },
    scrollIfLocalUserSentMessage() {
      if (this.$data.localUserSentMessage) {
        this.scrollToBottom();
        this.$data.localUserSentMessage = false;
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
