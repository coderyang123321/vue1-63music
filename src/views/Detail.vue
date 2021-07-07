<template>
  <div class="detail">
    <DetailHeader :title="playlist.name"></DetailHeader>
    <DetailTop :imgUrl="playlist.coverImgUrl" ref="top"></DetailTop>
    <div class="bottom">
      <ScrollView ref="scrollview">
        <DetailBottom :tracks="tracks"></DetailBottom>
      </ScrollView>
    </div>
  </div>
</template>
<script>
import DetailHeader from "@/components/Detail/DetailHeader";
import DetailTop from "@/components/Detail/DetailTop";
import DetailBottom from "@/components/Detail/DetailBottom";
import ScrollView from "@/components/ScrollView";

import { getSongDetail, getAlbumDetail } from "@/api/index";
export default {
  components: {
    DetailHeader,
    DetailTop,
    DetailBottom,
    ScrollView,
  },
  data() {
    return {
      playlist: {},
      tracks: [],
    };
  },
  created() {
    console.log(this.$route.params.type);
    if (this.$route.params.type == "personalized") {
      getSongDetail({ id: this.$route.params.id }).then((res) => {
        this.playlist = res.playlist;
        this.tracks = res.playlist.tracks;
      });
    } else if (this.$route.params.type == "album") {
      getAlbumDetail({ id: this.$route.params.id }).then((res) => {
        this.playlist = {
          name: res.album.name,
          coverImgUrl: res.album.picUrl,
        };
        this.tracks = res.songs;
      });
    }
  },
  mounted() {
    // .$el可以拿到根元素
    let defaultHeight = this.$refs.top.$el.offsetHeight;
    // console.log(defaultHeight);
    this.$refs.scrollview.scrolling((offsetY) => {
      if (offsetY < 0) {
        // console.log("向上滚动");
        //向上滚动的时候模糊图片 利用 CSS3 filter 属性用为元素添加可视效果 (例如：模糊与饱和度) 。
        //  blur() 给图像设置高斯模糊。"radius"一值设定高斯函数的标准差，或者是屏幕上以多少像素融在一起， 所以值越大越模糊；
        let scale = Math.abs(offsetY) / defaultHeight; // 需要得到越来越大的值
        // console.log(scale);
        //调用组件里面的changeMask()方法改变透明度
        this.$refs.top.changeMask(scale);
        /**
         * 高斯模糊效果非常消耗性能，不推荐在移动端使用，如果非要使用，建议只设置一次，不要一滚动就变化
         * 可以使用蒙版代替，在图片上盖一层蒙版
         */
        // this.$refs.top.$el.style.filter = `blur(${scale}px)`;
      } else {
        //向下滚动的时候放大图片
        let scale = 1 + offsetY / defaultHeight;
        // console.log(scale);
        // css3 transform:scale(2)里面的值大于1就是放大，视觉上放大元素 ，实际上是改变x，y轴的刻度，实际元素宽高不变
        this.$refs.top.$el.style.transform = `scale(${scale})`;
      }
      // console.log(offsetY);
    });
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";
.detail {
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  @include bg_sub_color();
  .bottom {
    position: fixed;
    top: 500px;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>