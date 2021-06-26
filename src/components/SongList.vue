<template>
  <div class="newsong">
    <!-- 最新音乐 -->
    <div class="newsong-top">
      <h3>{{ title }}</h3>
    </div>
    <ul class="newsong-list">
      <li class="list-item" v-for="item in newsong" :key="item.id">
        <!-- <img :src="item.song.album.picUrl" alt="" /> -->
        <img v-lazy="item.song.album.picUrl" alt="" />

        <div>
          <h3>{{ item.name }}</h3>
          <p>{{ item.song.artists[0].name }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    newsong: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: "",
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";
@import "@/assets/css/variable.scss";
.newsong {
  .newsong-top {
    width: 100%;
    height: 84px;
    line-height: 84px;
    @include bg_sub_color();
    padding: 0 20px;
    border-bottom: 1px solid #ccc;
    h3 {
      @include font_color();
      @include font_size($font_large);
      font-weight: bold;
    }
  }
  .newsong-list {
    width: 100%;
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
        h3 {
          @include font_size($font_large);
          @include font_color();
        }
        p {
          @include font_size($font_samll);
          @include font_color();
          opacity: 0.6;
          margin-top: 30px;
        }
      }
    }
  }
}
</style>