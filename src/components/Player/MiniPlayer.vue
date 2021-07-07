<template>
  <div class="mini-player" v-show="this.isShowMiniPlayer">
    <div class="player-warpper">
      <div class="player-left" @click="showPlayer">
        <img
          src="https://p1.music.126.net/THc2dGCHBcMLuRlwQjccFg==/109951165210824295.jpg"
          alt=""
          ref="cicle"
        />
        <div class="player-title">
          <h3>演员</h3>
          <p>薛之谦</p>
        </div>
      </div>
      <div class="player-right">
        <div class="play" ref="play" @click="play"></div>
        <div class="list" @click.stop="showListPlayer"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  methods: {
    showListPlayer() {
      this.$emit("showList");
    },
    ...mapActions(["setFullScreen", "showMiniPlaying", "setIsPlaying"]),
    showPlayer() {
      // 显示默认播放界面
      this.setFullScreen(true);
      //隐藏迷你界面
      this.showMiniPlaying(false);
    },
    play() {
      this.setIsPlaying(!this.isPlaying);
    },
  },
  computed: {
    ...mapGetters(["isShowMiniPlayer", "isPlaying"]),
  },
  watch: {
    isPlaying(newVlaue, oldValue) {
      if (newVlaue) {
        this.$refs.play.classList.add("active");
        this.$refs.cicle.classList.add("cicleActive");
      } else {
        this.$refs.play.classList.remove("active");
        this.$refs.cicle.classList.remove("cicleActive");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";
@import "@/assets/css/variable.scss";
.mini-player {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 130px;
  @include bg_color();
  .player-warpper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .player-left {
      display: flex;
      padding-left: 30px;
      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        // 动画名称，动画时长，匀速，无限播放
        animation: circle 5s linear infinite;
        &.cicleActive {
          animation-play-state: paused; // 播放状态，暂停动画 ，， 默认时running'开启
        }
      }
      .player-title {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-left: 30px;
        h3 {
          @include font_size($font_medium);
          @include font_color();
        }
        p {
          @include font_size($font_samll);
          @include font_color();
        }
      }
    }
    .player-right {
      display: flex;
      align-items: center;
      .play {
        width: 80px;
        height: 80px;
        @include bg_img("../../assets/images/pause");
        &.active {
          @include bg_img("../../assets/images/play");
        }
      }
      .list {
        width: 120px;
        height: 120px;
        @include bg_img("../../assets/images/list");
      }
    }
  }
}
@keyframes circle {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>