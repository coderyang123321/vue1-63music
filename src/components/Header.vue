<template>
  <div class="header" @click="changeTheme">
    <div class="header-left"></div>
    <div class="header-title">知渔音乐</div>
    <div class="header-right"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      themeList: ["theme", "theme1", "theme2"],
      currentIndex: 0,
    };
  },
  methods: {
    changeTheme() {
      this.currentIndex++;
      if (this.currentIndex >= this.themeList.length) {
        this.currentIndex = 0;
      }
      document.documentElement.setAttribute(
        "data-theme",
        this.themeList[this.currentIndex]
      );
    },
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
  // background-color: red
  //调用混合里面的函数设置bgcolor
  @include bg_color();
  justify-content: space-between;
  align-items: center;
  .header-left,
  .header-right {
    width: 84px;
    height: 84px;
  }
  .header-left {
    @include bg_img("../assets/images/logo");
  }
  .header-right {
    @include bg_img("../assets/images/account");
  }
  .header-title {
    color: #fff;
    //设置字体大小不随屏幕变化而变化
    @include font_size($font_medium);
  }
  .theme {
    position: fixed;
    left: 0;
    bottom: 0;
    button {
      width: 100px;
      height: 100px;
      &:nth-of-type(1) {
        background-color: $background-color-theme;
      }
      &:nth-of-type(2) {
        background-color: $background-color-theme1;
      }
      &:nth-of-type(3) {
        background-color: $background-color-theme2;
      }
    }
  }
}
</style>