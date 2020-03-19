<template>
  <div>{{ $props.message }} </div>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  props: {
    messageLog: VueTypes.array.isRequired,
  }
};
</script>

<style lang="scss" scoped>
//
</style>
