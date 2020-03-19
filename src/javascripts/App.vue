<template>
  <div>
    <p>
      <img class="logo" src="../images/logo.jpg" alt="ロゴ">
      <span class="sample">Sample code</span>
    </p>
    <MessageBox
      :message="$data.message"
      :sendMessage="sendMessage"
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
      message: {},
      text: '',
      messages: [],
    };
  },
  created() {
    socket.on('connect', () => {
      console.log('connected!');
    });

    socket.on('send', (message) => {
      console.log(message);
      this.$data.message = message;
    });

    socket.on('loadMessages', (messages) => {
      this.$data.messages = messages;
    });
  },
  methods: {
    sendMessage(message) {
      socket.emit('send', message);
    }
  }
};
</script>

<style lang="scss" scoped>
.logo {
  width: 40px;
}

.sample {
  color: $red;
}
</style>
