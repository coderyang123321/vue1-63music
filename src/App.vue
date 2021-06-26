<template>
  <div id="app">
    <Header></Header>
    <TabBar></TabBar>
    <router-view />
  </div>
</template>
<script>
import Header from "./components/Header.vue";
import TabBar from "./components/TabBar.vue";

export default {
  components: {
    Header,
    TabBar,
  },
};
</script>
<style lang="scss">
</style>
