<template>
  <div class="player-bottom">
    <div class="progress">
      <span ref="eleCurrentTime">00:00</span>
      <div class="progress-bar" @click="progressBarClick" ref="progressBar">
        <div class="progress-line" ref="progressLine">
          <div class="progress-dot"></div>
        </div>
      </div>
      <span ref="eleTotalTime">00:00</span>
    </div>
    <div class="controll">
      <div class="mode loop" @click="mode" ref="mode"></div>
      <div class="prev" @click="prev"></div>
      <div class="play" @click="play" ref="play"></div>
      <div class="next" @click="next"></div>
      <div
        class="favorite"
        @click="favorite"
        :class="{ active: isFavorite(currentSong) }"
      ></div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import modeType from "../../store/modelType";
import { formatTime } from "../../utils/formatTime";
export default {
  props: {
    totalTime: {
      type: Number,
      default: 0,
      required: true,
    },
    currentTime: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  methods: {
    ...mapActions([
      "setIsPlaying",
      "setModeType",
      "setCurrentIndex",
      "setCurrentTime",
      "setFavoriteSong",
    ]),
    play() {
      //点击之后把当前状态取反
      this.setIsPlaying(!this.isPlaying);
    },
    //切换播放状态
    mode() {
      // 如果当前是循环模式，要切换到单曲模式
      if (this.modeType === modeType.loop) {
        this.setModeType(modeType.one);
        // 当前是单曲切换到随机
      } else if (this.modeType === modeType.one) {
        this.setModeType(modeType.random);
        // 当前随机求换到循环
      } else if (this.modeType === modeType.random) {
        this.setModeType(modeType.loop);
      }
    },
    //切换上一首
    prev() {
      this.setCurrentIndex(this.currentIndex - 1);
    },
    // 切换下一首
    next() {
      this.setCurrentIndex(this.currentIndex + 1);
    },
    //收藏歌曲
    favorite() {
      this.setFavoriteSong(this.currentSong);
    },
    // 判断是否收藏了，
    isFavorite(song) {
      let res = this.favoriteList.find((item) => {
        return item.id === song.id;
      });
      return res !== undefined;
    },
    progressBarClick(e) {
      // 1 计算进度条的位置
      // let normalLeft = e.target.offsetLeft;
      let normalLeft = this.$refs.progressBar.offsetLeft;
      let eventLeft = e.pageX;
      let clickLeft = eventLeft - normalLeft;
      // let progressWidth = e.target.offsetWidth;
      let progressWidth = this.$refs.progressBar.offsetWidth;

      let value = clickLeft / progressWidth; // 点击的位置在进度条中的宽度
      this.$refs.progressLine.style.width = value * 100 + "%";

      // 计算当前应该从什么地方开始播放
      let currentTime = this.totalTime * value;
      this.setCurrentTime(currentTime);
      // console.log(currentTime);
    },
  },
  computed: {
    ...mapGetters([
      "isPlaying",
      "modeType",
      "currentIndex",
      "currentSong",
      "favoriteList",
    ]),
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
    // 切换播放图标
    modeType(newValue, oldValue) {
      if (newValue === modeType.loop) {
        this.$refs.mode.classList.add("loop");
        this.$refs.mode.classList.remove("random");
      } else if (newValue === modeType.one) {
        this.$refs.mode.classList.remove("loop");

        this.$refs.mode.classList.add("one");
      } else if (newValue === modeType.random) {
        this.$refs.mode.classList.remove("one");

        this.$refs.mode.classList.add("random");
      }
    },
    // 监听音乐的总时长，变化后在格式化成 00:00
    totalTime(newValue, oldValue) {
      let time = formatTime(newValue);
      this.$refs.eleTotalTime.innerHTML = time.minute + ":" + time.second;
    },
    currentTime(newValue, oldValue) {
      // 1格式化当前播放时间
      let time = formatTime(newValue);
      this.$refs.eleCurrentTime.innerHTML = time.minute + ":" + time.second;
      // 2. 当前播放时间/ 总时间 得到的比列给前景的宽度，
      let value = (newValue / this.totalTime) * 100;
      this.$refs.progressLine.style.width = value + "%";
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
      .progress-line {
        position: relative;
        width: 0;
        height: 100%;
        background: #ccc;
        .progress-dot {
          // 小圆点相对于前景来定位，好处就是修改前景line的宽度，就可以实现小圆点同步时间移动
          position: absolute;
          left: 100%;
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
      &.loop {
        @include bg_img("../../assets/images/loop");
      }
      &.one {
        @include bg_img("../../assets/images/one");
      }
      &.random {
        @include bg_img("../../assets/images/shuffle");
      }
    }
    .prev {
      @include bg_img("../../assets/images/prev");
    }
    .play {
      @include bg_img("../../assets/images/play");
      // 新增一个类名
      &.active {
        @include bg_img("../../assets/images/pause");
      }
    }
    .next {
      @include bg_img("../../assets/images/next");
    }
    .favorite {
      @include bg_img("../../assets/images/un_favorite");
      &.active {
        @include bg_img("../../assets/images/favorite");
      }
    }
  }
}
</style>