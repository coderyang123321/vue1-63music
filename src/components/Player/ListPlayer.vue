<template>
  <div class="list-player" v-show="this.isShowListPlayer">
    <div class="player-warpper">
      <div class="player-top">
        <div class="top-left">
          <div class="mode loop" @click="mode" ref="mode"></div>
          <p>顺序播放</p>
        </div>
        <div class="top-right">
          <div class="del" @click="delAll"></div>
        </div>
      </div>
      <div class="player-middle">
        <ScrollView ref="scrollView">
          <ul ref="play">
            <li
              class="item"
              v-for="(item, index) in songs"
              :key="item.id"
              @click="selectMusic(index)"
            >
              <div class="item-left">
                <!-- ref只能 给一个元素添加，这里是给所有的歌曲都添加了，
                vue内部不知道获取的是哪一个，所有点击有bug -->
                <!-- <div class="item-play" @click="play" ref="play"></div> -->
                <div
                  class="item-play"
                  @click.stop="play"
                  v-show="currentIndex === index"
                ></div>
                <p>{{ item.name }}</p>
              </div>
              <div class="item-right">
                <div class="item-favorite"></div>
                <div class="item-del" @click.stop="del(index)"></div>
              </div>
            </li>
          </ul>
        </ScrollView>
      </div>
      <div class="player-footer">
        <p @click="hidden">关闭</p>
      </div>
    </div>
  </div>
</template>
<script>
import ScrollView from "@/components/ScrollView";
import { mapActions, mapGetters } from "vuex";
import modeType from "../../store/modelType";

export default {
  components: {
    ScrollView,
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions([
      "setIsPlaying",
      "setModeType",
      "showListPlaying",
      "setDelSong",
      "setCurrentIndex",
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
    hidden() {
      // 隐藏列表播放
      this.showListPlaying(false);
    },
    show() {
      // 显示列表播放
      this.showListPlaying(true);
    },
    del(index) {
      this.setDelSong(index);
    },
    delAll() {
      this.setDelSong();
    },
    selectMusic(index) {
      this.setCurrentIndex(index);
    },
  },
  computed: {
    ...mapGetters([
      "isPlaying",
      "modeType",
      "isShowListPlayer",
      "songs",
      "currentIndex",
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
    /*
    *一出来不能滚动的原因是，一出来就创建了，没有内容没有高度，
    就不能计算滚动高度，所有监听变化后，就需要重新刷新，计算滚动的高度
    */
    // 监听显示与隐藏playlist，让scroll重新刷新
    isShowListPlayer(newValue, oldValue) {
      if (newValue) {
        this.$refs.scrollView.refresh();
      }
    },
  },
};
</script>
<style lang="scss" scope>
@import "../../assets/css/mixin.scss";
@import "../../assets/css/variable.scss";
.list-player {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  @include bg_sub_color();
  .player-warpper {
    .player-top {
      width: 100%;
      height: 100px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .top-left {
        display: flex;
        align-items: center;
        padding-left: 20px;
        .mode {
          width: 56px;
          height: 56px;
          &.loop {
            @include bg_img("../../assets/images/small_loop");
          }
          &.one {
            @include bg_img("../../assets/images/small_one");
          }
          &.random {
            @include bg_img("../../assets/images/small_shuffle");
          }
        }
        p {
          @include font_size($font_medium_s);
          @include font_color();
          margin-left: 20px;
        }
      }
      .top-right {
        padding-right: 20px;
        .del {
          width: 90px;
          height: 90px;
          @include bg_img("../../assets/images/small_del");
        }
      }
    }
    .player-middle {
      // width: 100%;
      ul {
        &.active {
          .item {
            .item-play {
              @include bg_img("../../assets/images/small_pause");
            }
          }
        }
      }
      height: 700px;
      overflow: hidden;
      .item {
        height: 100px;
        border-top: 1px solid #ccc;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        box-sizing: border-box;
        .item-left {
          display: flex;
          align-items: center;
          .item-play {
            width: 56px;
            height: 56px;
            @include bg_img("../../assets/images/small_play");
          }
          p {
            @include font_size($font_medium_s);
            @include font_color();
            margin-left: 20px;
          }
        }
        .item-right {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .item-favorite {
            width: 56px;
            height: 56px;
            @include bg_img("../../assets/images/small_favorite");
          }
          .item-del {
            width: 52px;
            height: 52px;
            margin-left: 20px;
            margin-right: 20px;
            @include bg_img("../../assets/images/small_close");
          }
        }
      }
    }
    .player-footer {
      height: 100px;
      width: 100%;
      line-height: 100px;
      @include bg_color();
      p {
        text-align: center;
        @include font_size($font_medium);
        color: #fff;
      }
    }
  }
}
</style>