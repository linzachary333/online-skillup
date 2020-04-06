export default {
  setLocalUserSentMessage(state, payload) {
    state.localUserSentMessage = payload;
  },
  setSnackbar(state, payload) {
    state.displaySnackbar = payload;
  },
  setScrollBarAtBottom(state, payload) {
    state.scrollBarAtBottom = payload;
  },
  incrementUnreadMessagesByOne(state) {
    state.unreadMessagesCount++;
  },
  resetUnreadMessages(state) {
    state.unreadMessagesCount = 0;
  },
};
