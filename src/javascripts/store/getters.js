export default {
  getDisplaySnackbar: (state) => {
    return state.displaySnackbar;
  },
  getScrollBarAtBottom: (state) => {
    return state.scrollBarAtBottom;
  },
  getUnreadMessagesCount: (state) => {
    return state.unreadMessagesCount;
  },
  getLocalUserSentMessage: (state) => {
    return state.localUserSentMessage;
  },
};
