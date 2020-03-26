<template>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
    >
      <v-list-item class="px-2">
          <img class="logo" src="../../images/logo.jpg" alt="ロゴ">

        <v-list-item-title>リアルタイムチャットシステム</v-list-item-title>

        <v-btn
          icon
          @click.stop="mini = !mini"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-account-group-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-btn
            type="submit"
            @click="toggleParticipants"
            >
            参加者表示
          </v-btn>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  props: {
    getParticipantList: VueTypes.func.isRequired,
  },
  data() {
    return {
      drawer: true,
      mini: true,
      displayParticipants: false,
    };
  },
  methods: {
    toggleParticipants() {
      this.$data.displayParticipants = !this.$data.displayParticipants;
    }
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
.logo {
  width: 40px;
}
</style>
