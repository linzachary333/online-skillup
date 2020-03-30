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
        <template v-if="containsVideo(message.text)">
          <youtube
            v-for="(id, i) in videoIds(message.text)"
            :key="i"
            :video-id="id"
            :player-vars="playerVars"
            width="100%"
            height="50%"
          >
          </youtube>
        </template>
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
      playerVars: {
        autoplay: 0
      },
    };
  },
  methods: {
    containsVideo(text) {
      const matches = this.parseYoutubeLink(text);
      return matches !== null;
    },
    videoIds: function(text) {
      const matches = this.parseYoutubeLink(text);
      const idList = [];
      for (const match of matches) {
        idList.push(match.substring(match.length - 11));
      }
      return idList;
    },
    parseYoutubeLink(text) {
      const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/gi;
      return text.match(regex);
    }
  },
  computed: {
    checkMessageId: function(messageId) {
      return {
        yourMessage: messageId === this.$props.userId
      };
    },
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
