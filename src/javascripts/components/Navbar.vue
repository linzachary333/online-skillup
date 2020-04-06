<template>
  <div class="navContainer">
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      id="drawer"
      permanent
      expand-on-hover
      class="floatLeft"
    >
      <v-list-item class="px-2">
        <img class="logo" src="../../images/logo.jpg" alt="ロゴ">
        <v-list-item-title class="title">
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
import socket from '../utils/socket';

export default {
  data() {
    return {
      drawer: true,
      mini: true,
      displayParticipants: false,
      participants: [],
    };
  },
  created() {
    socket.on('updateParticipants', (participants) => {
      this.$data.participants = participants;
    });
  },
  methods: {
    toggleParticipants() {
      this.$data.displayParticipants = !this.$data.displayParticipants;
    }
  },
  computed: {
    getParticipantList: function() {
      let participantList = '';
      for (const participant of this.$data.participants) {
        participantList += `${participant.user}\n`;
      }
      return participantList;
    },
    checkMessageId: function(messageId) {
      return {
        yourMessage: messageId === this.$props.userId
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.navContainer {
  position: absolute;
  width: 100%;
  z-index: 3;
}

.floatLeft {
  float: left;
}

.logo {
  width: 40px;
}

.title {
  text-align: center;
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
