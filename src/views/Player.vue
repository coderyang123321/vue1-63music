<template>
  <div class="player">
    <NormalPlayer
      :totalTime="totalTime"
      :currentTime="currentTime"
    ></NormalPlayer>
    <MiniPlayer @showList="showList"></MiniPlayer>
    <ListPlayer ref="listPlayer"></ListPlayer>
    <audio
      :src="currentSong.url"
      ref="audio"
      @timeupdate="timeupdate"
      @ended="end"
    ></audio>
  </div>
</template>
<script>
import NormalPlayer from "@/components/Player/NormalPlayer";
import MiniPlayer from "@/components/Player/MiniPlayer";
import ListPlayer from "@/components/Player/ListPlayer";
import { mapGetters, mapActions } from "vuex";
import mode from "../store/modelType";
import { createRandomIndex } from "../utils/createRandomIndex";
export default {
  components: {
    NormalPlayer,
    MiniPlayer,
    ListPlayer,
  },
  data() {
    return {
      totalTime: 0, //播放时间总时长
      currentTime: 0, // 当前播放时间
    };
  },
  methods: {
    ...mapActions([
      "setCurrentIndex",
      "setFavoriteList",
      "setHistorySong",
      "setHistryList",
    ]),
    showList() {
      this.$refs.listPlayer.show();
    },
    //拿到当前的播放时间
    timeupdate(e) {
      this.currentTime = e.target.currentTime;
      // console.log(e.target.currentTime);
    },
    //播放完触发
    end() {
      // 根据模式判断是随机还是正常还是单曲播放
      if (this.modeType === mode.loop) {
        //循环模式下，播放下一首
        this.setCurrentIndex(this.currentIndex + 1);
      } else if (this.modeType === mode.one) {
        // 单曲模式继续播放
        this.$refs.audio.play();
      } else if (this.modeType === mode.random) {
        // 随机模式，随机生成播放列表的索引
        let index = createRandomIndex(this.songs.length);
        this.setCurrentIndex(index);
      }
      // console.log("播放完了");
    },
  },
  computed: {
    ...mapGetters([
      "currentSong",
      "isPlaying",
      "currentIndex",
      "curTime",
      "modeType",
      "songs",
      "favoriteList",
      "historyList",
    ]),
  },
  watch: {
    // 监听isPlaying的变化，设置音乐播放还是暂停
    isPlaying(newValue, oldValue) {
      if (newValue) {
        // console.log("播放");
        // 如果播放了，则把当前歌曲加入到播放历史里面
        this.setHistorySong(this.currentSong);
        this.$refs.audio.play();
      } else {
        this.$refs.audio.pause();
      }
    },
    currentIndex(newValue, oldValue) {
      //音频加载到能够播放时，触发该事件
      /**
       * 在ios系统中不会自动加载歌曲，所有oncanplay不会自动执行
       * 在pc端和Android端，系统会自动加载歌曲，所有oncanplay会自当执行
       */
      /**\
       * 解决方案：如果监听ios中Audio的歌曲是否已经准备好了，通过ondurationchange事件来监听
       * ondurationchange事件什么时候执行：当歌曲加载完之后执行，因为只有当歌曲加载完成之后才能获取总时长
       */
      this.$refs.audio.ondurationchange = () => {
        console.log(2);
        //监听上下一首，重新获取歌曲总时长
        this.totalTime = this.$refs.audio.duration;

        if (this.isPlaying) {
          // console.log("这是下一首");
          this.setHistorySong(this.currentSong);

          this.$refs.audio.play();
        } else {
          this.$refs.audio.pause();
        }
      };
    },
    curTime(newValue, oldValue) {
      this.$refs.audio.currentTime = newValue;
    },
    // 监听收藏歌曲数组的改变，存储到本地，这样刷新浏览器，收藏的歌曲依旧还在
    favoriteList(newValue, oldValue) {
      window.localStorage.setItem("favoriteList", JSON.stringify(newValue));
    },

    //存储历史歌曲
    historyList(newValue, oldValue) {
      window.localStorage.setItem("historyList", JSON.stringify(newValue));
    },
  },
  created() {
    let favoriteList = JSON.parse(window.localStorage.getItem("favoriteList"));
    if (favoriteList !== null) {
      this.setFavoriteList(favoriteList);
    }
    let historyList = JSON.parse(window.localStorage.getItem("historyList"));
    if (historyList !== null) {
      this.setHistryList(historyList);
    }
  },
  mounted() {
    this.$refs.audio.ondurationchange = () => {
      // 播放总时长，拿到的是秒
      console.log(1);
      this.totalTime = this.$refs.audio.duration;
    };
  },
};
</script>
<style lang="scss" scoped>
// .player {
// }
</style>