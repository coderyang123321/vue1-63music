<template>
  <transition appear>
    <div class="account">
      <AccountHeader @switchNum="switchNum"></AccountHeader>
      <AccountBottom :switchNum="selectNum"></AccountBottom>
    </div>
  </transition>
</template>
<script>
import AccountHeader from "@/components/Account/AccountHeader";
import AccountBottom from "@/components/Account/AccountBottom";

export default {
  components: {
    AccountHeader,
    AccountBottom,
  },
  data() {
    return {
      selectNum: 0,
    };
  },
  methods: {
    switchNum(num) {
      console.log(num);
      this.selectNum = num;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";
@import "@/assets/css/variable.scss";
.account {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  @include bg_sub_color() // background-color: red;
;
}
.v-enter {
  transform: translateX(100%);
}
.v-enter-active {
  transition: transform 1s;
}
.v-enter-to {
  transform: translateX(0);
}
.v-leave {
  transform: translateX(0);
}
.v-leave-active {
  transition: transform 1s;
}
.v-leave-to {
  transform: translateX(100%);
}
</style>