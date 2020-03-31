<template>
  <div>
    <template
      v-if="numberOfVideos(messageText) === 1"
    >
      <div class="videoContainer">
        <youtube
          v-for="(id, i) in videoIds(messageText)"
          :key="i"
          :video-id="id"
          :player-vars="playerVars"
          width="100%"
          height="100%"
        >
        </youtube>
      </div>
    </template>
    <template
      v-else-if="numberOfVideos(messageText) > 1"
    >
      <div class="carouselContainer">
        <v-carousel
          :show-arrows="true"
          :show-arrows-on-hover="true"
          :vertical="true"
          height="300px"
        >
          <v-carousel-item
            v-for="(id, i) in videoIds(messageText)"
            :key="i"
          >
            <youtube
              :video-id="id"
              :player-vars="playerVars"
              width="100%"
              height="100%"
            >
            </youtube>
          </v-carousel-item>
        </v-carousel>
      </div>
    </template>
  </div>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  props: {
    messageText: VueTypes.string.isRequired,
  },
  data() {
    return {
      playerVars: {
        autoplay: 0
      },
    };
  },
  methods: {
    numberOfVideos(text) {
      const matches = this.parseYoutubeLink(text);
      if (matches === null) return 0;
      return matches.length;
    },
    videoIds: function(text) {
      const matches = this.parseYoutubeLink(text);
      const idList = [];
      for (const match of matches) {
        idList.push(match.substring(match.length - 11));
      }
      // カルセールの最大限を八つのビデオにする
      return idList.slice(0, 8);
    },
    parseYoutubeLink(text) {
      const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/gi;
      return text.match(regex);
    }
  },
};
</script>

<style lang="scss" scoped>
.carouselContainer {
  padding: 12px;
}

.videoContainer {
  height: 300px;
  padding: 12px;
}
</style>
