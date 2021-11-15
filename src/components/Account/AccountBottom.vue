<template>
  <div class="account-bottom">
    <div class="bottom-play" @click="playAllMusic">
      <span></span>
      <span>播放全部</span>
    </div>
    <div class="bottom-wrapper">
      <ScrollView>
        <SongListItem
          :newsong="switchNum === 0 ? favoriteList : historyList"
        ></SongListItem>
      </ScrollView>
    </div>
  </div>
</template>
<script>
import ScrollView from "@/components/ScrollView";
import SongListItem from "@/components/SongListItem";
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  props: {
    switchNum: {
      type: Number,
      default: 0,
    },
  },
  components: {
    ScrollView,
    SongListItem,
  },
  methods: {
    ...mapActions([
      "setFullScreen",
      "getSongDetail",
      "showMiniPlaying",
      "setCurrentIndex",
    ]),
    ...mapMutations(["SET_SONG_DETAIL"]),
    playAllMusic() {
      // let ids = [];
      if (this.switchNum === 0) {
        // ids = this.favoriteList.map((item) => {
        //   return item.id;
        // });
        // 优化后的代码，因为vuex中已经有我喜欢的和播放历史的歌曲，没必要上面的代码再调接口
        this.SET_SONG_DETAIL(this.favoriteList);
      } else {
        // ids = this.historyList.map((item) => {
        //   return item.id;
        // });
        this.SET_SONG_DETAIL(this.historyList);
      }
      // this.getSongDetail(ids);
      this.setFullScreen(true);
      this.showMiniPlaying(false);
      this.setCurrentIndex(0);
    },
  },
  computed: {
    ...mapGetters(["favoriteList", "historyList"]),
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/variable.scss";
@import "@/assets/css/mixin.scss";
.account-bottom {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 100px;
  .bottom-play {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 260px;
    height: 60px;
    margin: 20px auto;
    border: 1px solid red;
    border-radius: 30px;
    @include border_color();
    span {
      display: inline-block;
      &:nth-of-type(1) {
        width: 46px;
        height: 46px;
        @include bg_img("../../assets/images/small_play");
        margin-right: 20px;
      }
    }
  }
  .bottom-wrapper {
    position: fixed;
    top: 200px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
  }
}
</style>