<template>
  <!-- 推荐对于仅使用 JavaScript 过渡的元素添加 v-bind:css="false"，
Vue 会跳过 CSS 的检测。这也可以避免过渡过程中 CSS 的影响。 -->
  <transition @enter="enter" @leave="leave" :css="false">
    <div class="normal-player" v-show="this.isFullScreen">
      <div class="normal-warpper">
        <PlayerHeader></PlayerHeader>
        <PlayerMiddle></PlayerMiddle>
        <PlayerBottom></PlayerBottom>
      </div>
      <div class="player-bg">
        <img
          src="https://p1.music.126.net/THc2dGCHBcMLuRlwQjccFg==/109951165210824295.jpg"
          alt=""
        />
      </div>
    </div>
  </transition>
</template>
<script>
import PlayerHeader from "@/components/Player/PlayerHeader";
import PlayerMiddle from "@/components/Player/PlayerMiddle";
import PlayerBottom from "@/components/Player/PlayerBottom";
import { mapGetters } from "vuex";
import Velocity from "velocity-animate";
import "velocity-animate/velocity.ui";
export default {
  components: {
    PlayerHeader,
    PlayerMiddle,
    PlayerBottom,
  },
  data() {
    return {};
  },
  methods: {
    // 动画进入时触发的钩子
    enter(el, done) {
      Velocity(el, "transition.shrinkIn", { duration: 500 }, function () {
        done();
      });
    },
    // 动画离开时触发的钩子

    leave(el, done) {
      Velocity(el, "transition.shrinkOut", { duration: 500 }, function () {
        done();
      });
    },
  },
  computed: {
    // mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性
    // 数组里是要映射到局部的数据 ， 页面上使用 this.isFullScreen 来访问
    ...mapGetters(["isFullScreen"]),
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/mixin.scss";
@import "../../assets/css/variable.scss";
.normal-player {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  @include bg_sub_color();
  .normal-warpper {
    width: 100%;
    height: 100%;
    z-index: 999;
    position: relative;
  }
  .player-bg {
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;
    img {
      // width: 100%;
      height: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      filter: blur(10px);
    }
  }
}
</style>