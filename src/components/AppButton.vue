<template>
  <button class="btn" v-bind:class="{'btn--large': large, 'btn--light': light}">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "AppButton",
  props: {
    large: Boolean,
    light: Boolean
  }
};
</script>