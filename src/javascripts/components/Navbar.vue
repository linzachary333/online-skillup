<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      id="drawer"
      :class="{floatLeft: displayParticipants === true}"
      permanent
      expand-on-hover
    >
      <v-list-item class="px-2">
        <img class="logo" src="../../images/logo.jpg" alt="ロゴ">

        <v-list-item-title
          class="title"
        >
            チームラボ課題
        </v-list-item-title>

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
            id="button"
            >
            参加者表示
          </v-btn>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-card
      class="participantContainer"
      :class="{hidden: displayParticipants === false}"
      raised
    >
      <v-card-title class="cardTitle">参加者リスト</v-card-title>
      <v-card-text>
        <p class="preformatted"><b>{{getParticipantList}}</b></p>
      </v-card-text>
  </v-card>
  </div>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  props: {
    getParticipantList: VueTypes.string.isRequired,
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

.title {
  text-align: center;
}

.floatLeft {
  float: left;
}

.pointer:hover {
  cursor: pointer;
}

#button {
  height: 30px;
}

#drawer {
  height: 105px !important;
  border-bottom: inset;
}

.participantContainer {
  width: 70%;
  margin: auto;
  height: 105px;
  overflow-y: auto;
}

.cardTitle {
  padding-bottom: 0;
}

.hidden {
  display: none;
}
</style>
