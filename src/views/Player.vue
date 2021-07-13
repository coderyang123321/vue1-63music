<template>
  <div class="player">
    <NormalPlayer
      :totalTime="totalTime"
      :currentTime="currentTime"
    ></NormalPlayer>
    <MiniPlayer @showList="showList"></MiniPlayer>
    <ListPlayer ref="listPlayer"></ListPlayer>
    <audio :src="currentSong.url" ref="audio" @timeupdate="timeupdate"></audio>
  </div>
</template>
<script>
import NormalPlayer from "@/components/Player/NormalPlayer";
import MiniPlayer from "@/components/Player/MiniPlayer";
import ListPlayer from "@/components/Player/ListPlayer";
import { mapGetters } from "vuex";
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
    showList() {
      this.$refs.listPlayer.show();
    },
    //拿到当前的播放时间
    timeupdate(e) {
      this.currentTime = e.target.currentTime;
      console.log(e.target.currentTime);
    },
  },
  computed: {
    ...mapGetters(["currentSong", "isPlaying", "currentIndex"]),
  },
  watch: {
    // 监听isPlaying的变化，设置音乐播放还是暂停
    isPlaying(newValue, oldValue) {
      if (newValue) {
        this.$refs.audio.play();
      } else {
        this.$refs.audio.pause();
      }
    },
    currentIndex(newValue, oldValue) {
      //音频加载到能够播放时，触发该事件
      this.$refs.audio.oncanplay = () => {
        //监听上下一首，重新获取歌曲总时长
        this.totalTime = this.$refs.audio.duration;

        if (this.isPlaying) {
          this.$refs.audio.play();
        } else {
          this.$refs.audio.pause();
        }
      };
    },
  },
  mounted() {
    this.$refs.audio.oncanplay = () => {
      // 播放总时长，拿到的是秒
      this.totalTime = this.$refs.audio.duration;
    };
  },
};
</script>
<style lang="scss" scoped>
// .player {
// }
</style>