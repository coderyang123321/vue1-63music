import {
  SET_FULL_SCREEN,
  SET_IS_PLAY,
  SHOW_MINI_PLAYING
} from "./mutations-type"
export default {
  // changeFullScreen(state, flag) {
  //   state.isFullScreen = flag
  // }
  // 把常量作为方法名称，要用中括号括起来
  [SET_FULL_SCREEN](state, flag) {
    state.isFullScreen = flag
  },
  // 迷你播放的显示隐藏
  [SHOW_MINI_PLAYING](state, flag) {
    state.isShowMiniPlayer = flag
  },
  [SET_IS_PLAY](state, flag) {
    state.isPlaying = flag
  }
}