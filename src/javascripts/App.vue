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
