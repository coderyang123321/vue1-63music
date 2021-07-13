import {
  SET_FULL_SCREEN,
  SET_IS_PLAY,
  SHOW_MINI_PLAYING,
  SET_MODE_TYPE,
  SHOW_LIST_PLAYING,
  SET_SONG_DETAIL,
  SET_SONG_LYRIC,
  SET_DEL_SONG,
  SET_CURRENT_INDEX
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
  },
  [SET_MODE_TYPE](state, flag) {
    state.modeType = flag
  },
  // 列表播放显示隐藏
  [SHOW_LIST_PLAYING](state, flag) {
    state.isShowListPlayer = flag
    
  },
  // 
  [SET_SONG_DETAIL](state, list) {
    state.songs = list
  },
  //获取歌词
  [SET_SONG_LYRIC](state, lyric) {
    state.currentLyric = lyric
  },
  [SET_DEL_SONG](state, index) {
    // 没有传index是点击删除全部，传了index是删除对应的每一首歌曲、
    if (index !== undefined) {
      state.songs.splice(index,1)
    } else {
      state.songs = []
      
    }
    if (state.songs.length === 0) {
      //清空播放列表后隐藏 全部播放页面
    state.isFullScreen = false
    state.isShowMiniPlayer = false
    state.isShowListPlayer = false
    }
    // 删除 的歌曲的index 小于currentIndex，要把currentIndex-1，这样才能对的上我所选中播放的歌曲
    if (index < state.currentIndex) {
        state.currentIndex = state.currentIndex - 1
    }
  },
  [SET_CURRENT_INDEX](state, index) {
    if (index > state.songs.length - 1) {
      index = 0
    } else if (index < 0) {
      index = state.songs.length-1
    }
    state.currentIndex = index
  }
}