
function scrollToBottom() {
  const messageLog = document.getElementById('messageLog');
  messageLog.scrollTop = messageLog.scrollHeight;
}

export {
  scrollToBottom
};
