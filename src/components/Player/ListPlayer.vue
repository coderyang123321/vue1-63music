<template>
  <div class="list-player" v-show="isShow">
    <div class="player-warpper">
      <div class="player-top">
        <div class="top-left">
          <div class="mode"></div>
          <p>顺序播放</p>
        </div>
        <div class="top-right">
          <div class="del"></div>
        </div>
      </div>
      <div class="player-middle">
        <ScrollView>
          <ul>
            <li class="item">
              <div class="item-left">
                <div class="item-play" @click="play" ref="play"></div>
                <p>演员</p>
              </div>
              <div class="item-right">
                <div class="item-favorite"></div>
                <div class="item-del"></div>
              </div>
            </li>
            <li class="item">
              <div class="item-left">
                <div class="item-play" @click="play" ref="play"></div>
                <p>演员</p>
              </div>
              <div class="item-right">
                <div class="item-favorite"></div>
                <div class="item-del"></div>
              </div>
            </li>
            <li class="item">
              <div class="item-left">
                <div class="item-play" @click="play" ref="play"></div>
                <p>演员</p>
              </div>
              <div class="item-right">
                <div class="item-favorite"></div>
                <div class="item-del"></div>
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

export default {
  components: {
    ScrollView,
  },
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    ...mapActions(["setIsPlaying"]),
    play() {
      //点击之后把当前状态取反
      this.setIsPlaying(!this.isPlaying);
    },
    hidden() {
      this.isShow = false;
    },
    show() {
      this.isShow = true;
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

          @include bg_img("../../assets/images/small_loop");
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
            @include bg_img("../../assets/images/small_pause");
            &.active {
              @include bg_img("../../assets/images/small_play");
            }
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