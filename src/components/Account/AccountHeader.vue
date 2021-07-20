<template>
  <div class="header" @click="changeTheme">
    <div class="header-left" @click.stop="back"></div>
    <ul class="header-title">
      <li :class="{ active: switchNum === 0 }" @click.stop="switchItem(0)">
        我喜欢的
      </li>
      <li :class="{ active: switchNum === 1 }" @click.stop="switchItem(1)">
        最近试听
      </li>
    </ul>
    <div class="header-right"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      themeList: ["theme", "theme1", "theme2"],
      currentIndex: 0,
      switchNum: 0,
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
    back() {
      // this.$router.go(-1); 等价于下面
      window.history.back();
    },
    switchItem(num) {
      this.switchNum = num;
      this.$emit("switchNum", num);
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
  // position: relative;
  // z-index: 999;
  .header-left,
  .header-right {
    width: 84px;
    height: 84px;
  }
  .header-left {
    @include bg_img("~@/assets/images/back");
  }
  .header-right {
    @include bg_img("~@/assets/images/more");
  }
  .header-title {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #fff;
    color: #fff;
    font-weight: bold;
    border-radius: 10px;
    @include font_size($font_medium);
    @include no-wrap(); //不换行
    height: 60px;
    li {
      height: 60px;
      line-height: 60px;
      padding: 0 20px;
      &:nth-of-type(1) {
        border-right: 1px solid #fff;
      }
      &.active {
        background: rgba(255, 255, 255, 0.3);
      }
    }
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