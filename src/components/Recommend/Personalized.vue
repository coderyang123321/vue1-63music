<template>
  <div class="personalized">
    <!-- 推荐歌单 -->
    <div class="personalized-top">
      <h3>{{ title }}</h3>
    </div>
    <div class="personalized-list">
      <div
        class="list-item"
        v-for="item in personalized"
        :key="item.id"
        @click="itemClick(item.id)"
      >
        <!-- <img :src="item.picUrl" alt="" /> -->
        <img v-lazy="item.picUrl" alt="" />
        <p>{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    personalized: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "",
    },
  },
  methods: {
    itemClick(id, type) {
      // console.log(id);
      this.$emit("toDetail", id, this.type);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";
@import "@/assets/css/variable.scss";

.personalized {
  .personalized-top {
    width: 100%;
    height: 84px;
    line-height: 84px;
    @include bg_sub_color();
    padding: 0 20px;
    border-bottom: 1px solid #ccc;
    h3 {
      @include font_color();
      @include font_size($font_large);
      font-weight: bold;
    }
  }
  .personalized-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    @include bg_sub_color();
    .list-item {
      padding: 20px;
      width: 200px;
      img {
        width: 100%;
        height: 200px;
        border-radius: 20px;
      }
      p {
        // 多行文本显示省略号
        // overflow: hidden;
        // text-overflow: ellipsis;
        // display: -webkit-box;
        // -webkit-box-orient: vertical;
        // // 要显示的行数
        // -webkit-line-clamp: 2;
        @include clamp(2);
        @include font_color();
        @include font_size($font_samll);
        text-align: center;
      }
    }
  }
}
</style>