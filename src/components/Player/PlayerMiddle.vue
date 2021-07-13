<template>
  <swiper :options="swiperOptions" class="banner">
    <!-- 封面slide -->
    <swiper-slide class="cd">
      <div class="cd-wrapper" ref="play">
        <img :src="currentSong.picUrl" />
      </div>
      <p>{{ getFirstLyric() }}</p>
    </swiper-slide>
    <!-- 歌词slide -->
    <swiper-slide class="lyric">
      <ScrollView>
        <ul>
          <li v-for="(value, key, index) in currentLyric" :key="index">
            {{ value }}
          </li>
        </ul>
      </ScrollView>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import ScrollView from "../ScrollView.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    SwiperSlide,
    Swiper,
    ScrollView,
  },
  data() {
    return {
      swiperOptions: {
        // 分页器
        pagination: {
          el: ".swiper-pagination",
          // 自定义分页器类名
          bulletClass: "my-bullet", //需设置.my-bullet样式
          // 激活状态的类名
          bulletActiveClass: "my-bullet-active",
        },
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
      },
    };
  },
  methods: {
    getFirstLyric() {
      for (let key in this.currentLyric) {
        return this.currentLyric[key];
      }
    },
  },
  computed: {
    ...mapGetters(["isPlaying", "currentSong", "currentLyric"]),
  },
  watch: {
    // 监听播放按钮的点击，控制动画转动与暂停
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
<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";
@import "@/assets/css/variable.scss";
.banner {
  position: fixed;
  top: 150px;
  bottom: 250px;
  left: 0;
  right: 0;
  .cd {
    .cd-wrapper {
      display: block;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      border: 30px solid #fff;
      overflow: hidden;
      margin: 0 auto;
      // 动画名称，动画时长，匀速，无限播放
      animation: circle 5s linear infinite;
      animation-play-state: paused;
      &.active {
        animation-play-state: running; // 播放状态，暂停动画 ，， 默认时running'开启
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    p {
      text-align: center;
      @include font_color();
      @include font_size($font_medium);
      margin-top: 50px;
    }
  }
  .lyric {
    li {
      @include font_size($font_medium);
      @include font_color();
      margin: 10px 0;
      text-align: center;
      &:last-of-type {
        padding-bottom: 80px;
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

<style lang="scss">
// 不能再局部里定义类名，要在全局里
@import "@/assets/css/mixin.scss";

.my-bullet {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: #fff;
  margin: 0 20px;
}
.my-bullet-active {
  width: 60px;
  @include bg_color();
}
</style>