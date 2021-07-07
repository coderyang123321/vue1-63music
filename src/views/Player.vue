<template>
  <div class="player">
    <NormalPlayer></NormalPlayer>
    <MiniPlayer @showList="showList"></MiniPlayer>
    <ListPlayer ref="listPlayer"></ListPlayer>
  </div>
</template>
<script>
import NormalPlayer from "@/components/Player/NormalPlayer";
import MiniPlayer from "@/components/Player/MiniPlayer";
import ListPlayer from "@/components/Player/ListPlayer";

export default {
  components: {
    NormalPlayer,
    MiniPlayer,
    ListPlayer,
  },
  methods: {
    showList() {
      this.$refs.listPlayer.show();
    },
  },
};
</script>
<style lang="scss" scoped>
// .player {
// }
</style>