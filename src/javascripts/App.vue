<template>
  <v-app>
    <div>
      <Navbar />
      <MessageLog
        id="messageLog"
        :userId="userId"
      />
      <BottomContainer
        :userId="userId"
      />
    </div>
  </v-app>
</template>

<script>
import socket from './utils/socket';
// components
import MessageLog from './components/MessageLog.vue';
import Navbar from './components/Navbar.vue';
import BottomContainer from './components/BottomContainer.vue';

export default {
  components: {
    MessageLog,
    Navbar,
    BottomContainer,
  },
  data() {
    return {
      userId: '',
    };
  },
  created() {
    socket.on('loadUserId', (userId) => {
      this.$data.userId = userId;
    });
  },
};
</script>
