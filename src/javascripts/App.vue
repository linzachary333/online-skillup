<template>
  <div>
    <p>
      <img class="logo" src="../images/logo.jpg" alt="ロゴ">
    </p>
    <button type="submit" @click="toggleParticipants">
      参加者表示
    </button>
    <template v-if="displayParticipants">
      <p class="preformatted">{{getParticipantList}}</p>
    </template>

    <MessageBox
      :sendMessage="sendMessage"
    />
    <messageLog
      :messages="messages"
    />
  </div>
</template>

<script>
import socket from './utils/socket';

// components
import MessageBox from './components/MessageBox.vue';
import MessageLog from './components/MessageLog.vue';

export default {
  components: {
    MessageBox,
    MessageLog
  },
  data() {
    return {
      messages: [],
      participants: [],
      displayParticipants: false
    };
  },
  created() {
    socket.on('updateParticipants', (participants) => {
      this.$data.participants = participants;
    });

    socket.on('loadMessages', (messages) => {
      this.$data.messages = messages;
    });
  },
  methods: {
    toggleParticipants() {
      this.$data.displayParticipants = !this.$data.displayParticipants;
    },
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
.logo {
  width: 40px;
}

.preformatted {
  white-space: pre;
}

.sample {
  color: $red;
}
</style>
