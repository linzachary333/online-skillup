<template>
  <v-app>
    <div>
    <!--
        <p>
          <img class="logo" src="../images/logo.jpg" alt="ロゴ">
        </p>
        <v-btn
        type="submit"
        @click="toggleParticipants"
        >
        参加者表示
      </v-btn>
      <template v-if="displayParticipants">
        <p class="preformatted">{{getParticipantList}}</p>
      </template>
      <Navbar
        :getParticipantList="getParticipantList"
      />
    -->
      <MessageLog
        :messages="messages"
        :userId="userId"
      />
      <MessageBox
      class="messageBox"
        :sendMessage="sendMessage"
        :userId="userId"
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
  },
  computed: {
    getParticipantList: function() {
      let participantList = '';
      let count = 1;
      for (const participant of this.$data.participants) {
        participantList += `${count}:${participant.user}\n`;
        count++;
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
