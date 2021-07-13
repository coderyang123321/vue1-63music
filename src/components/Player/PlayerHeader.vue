<template>
  <div class="header">
    <div class="header-left" @click="hiddenNormalPlayer"></div>
    <div class="header-title">
      <h3>{{ currentSong.name }}</h3>
      <p>{{ currentSong.singer }}</p>
    </div>
    <div class="header-right"></div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions(["setFullScreen", "showMiniPlaying"]),
    hiddenNormalPlayer() {
      // 隐藏播放界面
      this.setFullScreen(false);
      //显示迷你界面
      this.showMiniPlaying(true);
    },
  },
  computed: {
    ...mapGetters(["currentSong"]),
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/variable.scss";
@import "@/assets/css/mixin.scss";

.header {
  display: flex;
  width: 100%;
  height: 100px;
  justify-content: space-between;
  align-items: center;
  .header-left,
  .header-right {
    width: 84px;
    height: 84px;
  }
  .header-left {
    @include bg_img("~@/assets/images/down");
  }

  .header-title {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    color: #fff;
    //设置字体大小不随屏幕变化而变化
    @include font_size($font_medium);
    @include no-wrap() //不换行
;
  }
}
</style>