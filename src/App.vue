<template>
  <div id="imdb-app">
    <div class="wrapper">
      <app-header></app-header>
      <section class="content-body">
        <router-view></router-view>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  created: function() {},
  props: {}
};
</script>