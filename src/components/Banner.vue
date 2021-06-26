<template>
  <div>
    <swiper :options="swiperOptions" class="banner">
      <swiper-slide
        v-for="item in banner"
        :key="item.bannerId"
        class="banner-item"
      >
        <a :href="item.url">
          <img :src="item.pic" alt="" />
        </a>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
export default {
  props: {
    banner: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      swiperOptions: {
        loop: true,
        autoplay: {
          delay: 1000, //当切换到最后一个slide时停止自动切换
          stopOnLastSlide: false, //用户操作swiper之后，是否禁止autoplay
        },
        // 分页器
        pagination: {
          el: ".swiper-pagination",
        },
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
        // Some Swiper option/callback...
      },
    };
  },
};
</script>
<style lang="scss" scoped>
.banner {
  .banner-item {
    img {
      width: 100%;
      height: 300px;
    }
  }
}
</style>
<style lang="scss">
// 如果要覆盖swiper默认样式，则不能添加scoped属性
@import "@/assets/css/mixin.scss";
.banner {
  .swiper-pagination-bullet {
    width: 16px;
    height: 16px;
    background: #fff;
    opacity: 1;
    // background-color: red;
  }
  .swiper-pagination-bullet-active {
    @include bg_color();
  }
}
</style>