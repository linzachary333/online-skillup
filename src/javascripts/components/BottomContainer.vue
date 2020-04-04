<template>
  <div class="outerContainer">
    <v-snackbar
      v-model="getDisplaySnackbar"
      class="snackbar"
      :timeout="0"
      @click="clickedSnackbar"
    >
      {{getUnreadMessagesCount}} unread message(s).
      <v-icon color="blue">mdi-close</v-icon>
    </v-snackbar>
    <MessageBox
      class="messageBox"
      :userId="userId"
    />
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import MessageBox from './MessageBox.vue';
import { scrollToBottom } from '../utils/Utils.js';

export default {
  components: {
    MessageBox,
  },
  props: {
    userId: String,
  },
  methods: {
    ...mapMutations([
      'setSnackbar',
      'setScrollBarAtBottom',
      'resetUnreadMessages'
    ]),
    clickedSnackbar() {
      scrollToBottom();
      this.setSnackbar(false);
      this.setScrollBarAtBottom(true);
      this.resetUnreadMessages();
    },
  },
  computed: {
    getParticipantList: function() {
      let participantList = '';
      for (const participant of this.$data.participants) {
        participantList += `${participant.user}\n`;
      }
      return participantList;
    },
    ...mapGetters([
      'getUnreadMessagesCount',
      'getDisplaySnackbar'
    ]),
  }
};
</script>

<style lang="scss" scoped>
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
</style>
