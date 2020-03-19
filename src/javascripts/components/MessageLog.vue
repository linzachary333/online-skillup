<template>
  <ul>
    <h1> <u>チャットリスト</u> </h1>
    <template v-for="message in messages">
      <li :key="message.key">

        <h3>{{message.name}}</h3>
        <p>{{message.text}}</p>
        <h5>{{message.time}}</h5>
      </li>
    </template>
  </ul>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  props: {
    messages: VueTypes.array.isRequired,
  }
};
</script>

<style lang="scss" scoped>
//
</style>
