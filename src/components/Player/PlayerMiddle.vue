<template>
  <swiper :options="swiperOptions" class="banner">
    <!-- 封面slide -->
    <swiper-slide class="cd">
      <div class="cd-wrapper" ref="play">
        <img
          src="https://p1.music.126.net/THc2dGCHBcMLuRlwQjccFg==/109951165210824295.jpg"
        />
      </div>
      <p>没那么简单 终于找到聊得来的伴</p>
    </swiper-slide>
    <!-- 歌词slide -->
    <swiper-slide class="lyric">
      <ScrollView>
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
          <li>6</li>
          <li>7</li>
          <li>8</li>
          <li>9</li>
          <li>10</li>
          <li>11</li>
          <li>12</li>
          <li>13</li>
          <li>14</li>
          <li>15</li>
          <li>16</li>
          <li>17</li>
          <li>18</li>
          <li>19</li>
          <li>20</li>
          <li>21</li>
          <li>22</li>
          <li>23</li>
          <li>24</li>
          <li>25</li>
          <li>26</li>
          <li>27</li>
          <li>28</li>
          <li>29</li>
          <li>30</li>
          <li>31</li>
          <li>32</li>
          <li>33</li>
          <li>34</li>
          <li>35</li>
          <li>36</li>
          <li>37</li>
          <li>38</li>
          <li>39</li>
          <li>40</li>
          <li>41</li>
          <li>42</li>
          <li>43</li>
          <li>44</li>
          <li>45</li>
          <li>46</li>
          <li>47</li>
          <li>48</li>
          <li>49</li>
          <li>50</li>
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
  computed: {
    ...mapGetters(["isPlaying"]),
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
      &.active {
        animation-play-state: paused; // 播放状态，暂停动画 ，， 默认时running'开启
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