<template>
  <div id="app">
    <Header></Header>
    <TabBar></TabBar>
    <router-view />
    <Player></Player>
  </div>
</template>
<script>
import Header from "./components/Header.vue";
import TabBar from "./components/TabBar.vue";
import Player from "./views/Player.vue";

export default {
  components: {
    Header,
    TabBar,
    Player,
  },
};
</script>
<style lang="scss">
</style>
