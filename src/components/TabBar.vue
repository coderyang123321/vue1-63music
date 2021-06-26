<template>
  <div class="tabbar">
    <router-link tag="div" class="item" to="/recommend">
      <span>推荐</span>
    </router-link>
    <router-link tag="div" class="item" to="/singer">
      <span>歌单</span>
    </router-link>
    <router-link tag="div" class="item" to="/rank">
      <span>排行</span>
    </router-link>
    <router-link tag="div" class="item" to="/search">
      <span>电台</span>
    </router-link>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
@import "@/assets/css/variable.scss";
@import "@/assets/css/mixin.scss";
.tabbar {
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 84px;
  @include bg_sub_color();
  .item {
    span {
      line-height: 84px;
      @include font_size($font_medium);
      @include font_color();
    }
    &.router-link-active {
      span {
        @include font_active_color();
      }
      border-bottom: 5px solid red;
      @include border_color();
    }
  }
}
</style>