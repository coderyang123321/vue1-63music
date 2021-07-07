import {
  SET_FULL_SCREEN,
  SET_IS_PLAY,
  SHOW_MINI_PLAYING
}
  from "./mutations-type"
export default {
  // setFullScreen({ commit }, flag) {
  //       commit('changeFullScreen',flag)
  //     }
  setFullScreen({ commit }, flag) {
    commit(SET_FULL_SCREEN,flag)
  },
  showMiniPlaying({ commit }, flag) {
    commit(SHOW_MINI_PLAYING,flag)
  },
  setIsPlaying({ commit }, flag) {
    commit(SET_IS_PLAY,flag)
  }
}