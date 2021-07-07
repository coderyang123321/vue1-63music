<template>
  <ul class="detail-bottom">
    <li class="bottom-top">
      <div class="detail-icon"></div>
      <div class="title">播放全部</div>
    </li>
    <li v-for="item in tracks" :key="item.id" class="item" @click="selectMusic">
      <h3>{{ item.name }}</h3>
      <p>{{ item.al.name }} - {{ item.ar[0].name }}</p>
    </li>
  </ul>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    tracks: {
      type: Array,
    },
  },
  methods: {
    ...mapActions(["setFullScreen", "showMiniPlaying"]),
    selectMusic() {
      // this.$store.dispatch("setFullScreen", true);
      //显示默认播放界面
      this.setFullScreen(true);
      //隐藏迷你界面
      this.showMiniPlaying(false);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/variable.scss";
@import "@/assets/css/mixin.scss";

.detail-bottom {
  width: 100%;
  li {
    width: 100%;
    height: 100px;
    padding: 20px;
    box-sizing: border-box;
    @include bg_sub_color();
    border-bottom: 1px solid #ccc;
  }
  .bottom-top {
    display: flex;
    align-items: center;
    border-top-right-radius: 50px;
    border-top-left-radius: 50px;

    .detail-icon {
      width: 60px;
      height: 60px;
      margin-right: 20px;
      @include bg_img("~@/assets/images/small_play");
    }
    .title {
      @include font_size($font_large);
      @include font_color();
    }
  }
  .item {
    h3 {
      @include font_color();
      @include font_size($font_medium);
    }
    p {
      @include font_color();
      @include font_size($font_samll);
      margin-top: 10px;
    }
  }
}
</style>