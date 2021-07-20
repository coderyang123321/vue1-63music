<template>
  <div>
    <ul class="newsong-list">
      <li
        class="list-item"
        v-for="item in newsong"
        :key="item.id"
        @click="showPlayer(item.id)"
      >
        <!-- <img :src="item.song.album.picUrl" alt="" /> -->
        <img v-lazy="item.picUrl" alt="" />
        <div>
          <h3>{{ item.name }}</h3>
          <p>{{ item.singer }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  props: {
    newsong: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    ...mapActions(["setFullScreen", "showMiniPlaying", "getSongDetail"]),
    showPlayer(id) {
      //显示播放界面
      this.setFullScreen(true);
      //隐藏迷你界面
      this.showMiniPlaying(false);
      console.log(id);
      this.getSongDetail([id]);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";
@import "@/assets/css/variable.scss";
.newsong-list {
  width: 100%;
  height: 100%;
  .list-item {
    height: 200px;
    display: flex;
    align-items: center;
    padding: 20px;
    margin-bottom: 20px;
    // @include bg_sub_color();
    border-bottom: 1px solid #ccc;
    img {
      width: 150px;
      height: 150px;
      border-radius: 20px;
      margin-right: 40px;
    }
    div {
      width: 80%;
      h3 {
        @include font_size($font_large);
        @include font_color();
        @include no-wrap();
      }
      p {
        @include font_size($font_samll);
        @include font_color();
        @include no-wrap();
        opacity: 0.6;
        margin-top: 30px;
      }
    }
  }
}
</style>