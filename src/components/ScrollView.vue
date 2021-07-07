<template>
  <div id="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>
<script>
// IScroll 专业版 可以监听滚动的位置
import IScroll from "iscroll/build/iscroll-probe";
export default {
  mounted() {
    this.iscroll = new IScroll(this.$refs.wrapper, {
      mouseWheel: true,
      scrollbars: false,
      probeType: 3,
      // 解决拖拽卡顿问题
      scrollX: false,
      scrollY: true,
      disablePointer: true,
      disableTouch: false,
      disableMouse: true,
    });
    // setTimeout(() => {
    //   console.log(this.iscroll.maxScrollY);
    //   this.iscroll.refresh();
    //   console.log(this.iscroll.maxScrollY);
    // }, 5000);

    //1创建观察者对象，可以监听容器内子节点的变化
    /**
     * MutationObserver 监听的指定内容变化就触发回调
     * mutationList 发生变化的数组
     * observer 观察者对象
     */
    let observer = new MutationObserver((mutationList, observer) => {
      // console.log(this.iscroll.maxScrollY);
      this.iscroll.refresh();
      // console.log(this.iscroll.maxScrollY);
    });

    /**
     * 2. 告诉观察者对象，我们需要观察什么内容
     */
    let config = {
      childList: true, // 观察目标子节点的变化，是否有添加或者删除
      subtree: true, // 观察后代节点，默认为 false
      attributeFilter: ["height", "offsetHeight"], // 观察特定属性
    };
    /**
     * 3 告诉观察者对象我们需要观察谁，我们需要观察什么内容
     */
    observer.observe(this.$refs.wrapper, config);
  },
  methods: {
    // 提供一个监听滚动距离的方法给外界
    scrolling(callback) {
      this.iscroll.on("scroll", function () {
        callback(this.y);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#wrapper {
  width: 100%;
  height: 100%;
}
</style>