<template>
  <div class="detail">歌单详情</div>
</template>
<script>
export default {
  created() {
    console.log(this.$route);
  },
};
</script>
<style lang="scss" scoped>
.detail {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: red;
}
</style>