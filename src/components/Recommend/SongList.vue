<template>
  <div class="newsong">
    <!-- 最新音乐 -->
    <div class="newsong-top">
      <h3>{{ title }}</h3>
    </div>
    <SongListItem :newsong="newsong"></SongListItem>
  </div>
</template>

<script>
import SongListItem from "../SongListItem";
export default {
  components: {
    SongListItem,
  },
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
}
</style>