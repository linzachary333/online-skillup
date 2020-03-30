<template>
  <ul class="container">
    <template v-for="message in messages">
      <v-card
        class="textbox"
        :class="{yourMessage: message.userId === userId}"
        shaped
        :key="message.key"
      >
        <v-card-title>{{message.name}}</v-card-title>
        <v-card-subtitle>{{message.time}}</v-card-subtitle>
        <v-card-text class="cardText">
          {{message.text}}
        </v-card-text>
        <youtube
          width="100%"
          height="50%"
          :video-id="videoId"
          :player-vars="playerVars"
        ></youtube>
      </v-card>
    </template>
  </ul>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  props: {
    messages: VueTypes.array.isRequired,
    userId: VueTypes.string.isRequired,
  },
  data() {
    return {
      videoId: 'lG0Ys-2d4MA',
      playerVars: {
        autoplay: 0
      }
    };
  },
  computed: {
    checkMessageId: function(messageId) {
      return {
        yourMessage: messageId === this.$props.userId
      };
    }
  }
};
</script>

<style lang="scss" scoped>
//

.container {
  overflow-y: auto;
  height: 70vh;
}

.textbox {
  margin: 5%;
  width: 35%;
  clear: both;
}

.cardText {
  white-space: pre-line;
}

.yourMessage {
  background-image: linear-gradient(#b7ea6f, #8bd544);
  float: right;
}
</style>
