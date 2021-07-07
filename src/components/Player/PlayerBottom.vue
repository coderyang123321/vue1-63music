<template>
  <div class="player-bottom">
    <div class="progress">
      <span>00:00</span>
      <div class="progress-bar">
        <div class="progress-line">
          <div class="progress-dot"></div>
        </div>
      </div>
      <span>00:00</span>
    </div>
    <div class="controll">
      <div class="mode"></div>
      <div class="prev"></div>
      <div class="play" @click="play" ref="play"></div>
      <div class="next"></div>
      <div class="favorite"></div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  methods: {
    ...mapActions(["setIsPlaying"]),
    play() {
      //点击之后把当前状态取反
      this.setIsPlaying(!this.isPlaying);
    },
  },
  computed: {
    ...mapGetters(["isPlaying"]),
  },
  watch: {
    //监听改变  为真的话，添加active类 假的话去除active类
    isPlaying(newVlaue, oldValue) {
      if (newVlaue) {
        this.$refs.play.classList.add("active");
      } else {
        this.$refs.play.classList.remove("active");
      }
    },
  },
};
</script>
<style lang="scss" scope>
@import "../../assets/css/mixin.scss";
@import "../../assets/css/variable.scss";
.player-bottom {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  .progress {
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      @include font_size($font_samll);
      @include font_color();
    }
    .progress-bar {
      width: 100%;
      margin: 0 10px;
      background-color: #fff;
      height: 10px;
      position: relative;
      .progress-line {
        width: 50%;
        height: 100%;
        background: #ccc;
        .progress-dot {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: red;
        }
      }
    }
  }
  .controll {
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    padding: 50px 0;
    div {
      width: 84px;
      height: 84px;
    }
    .mode {
      @include bg_img("../../assets/images/loop");
    }
    .prev {
      @include bg_img("../../assets/images/prev");
    }
    .play {
      @include bg_img("../../assets/images/pause");
      // 新增一个类名
      &.active {
        @include bg_img("../../assets/images/play");
      }
    }
    .next {
      @include bg_img("../../assets/images/next");
    }
    .favorite {
      @include bg_img("../../assets/images/un_favorite");
    }
  }
}
</style>