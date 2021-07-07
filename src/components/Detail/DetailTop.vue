<template>
  <div class="detail-top">
    <div class="detail-img">
      <img :src="imgUrl" alt="" />
      <div class="mask" ref="mask"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imgUrl: {
      type: String,
      default: "",
    },
  },
  methods: {
    changeMask(opacity) {
      this.$refs.mask.style.opacity = opacity;
    },
  },
};
</script>
<style lang="scss" scoped>
.detail-img {
  width: 100%;
  height: 500px;
  overflow: hidden;
  position: relative;
  img {
    width: 100%;
    height: 100%;
  }
  .mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0;
  }
}
</style>