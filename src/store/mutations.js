import {
  SET_FULL_SCREEN,
  SET_IS_PLAY,
  SHOW_MINI_PLAYING,
  SET_MODE_TYPE,
  SHOW_LIST_PLAYING,
  SET_SONG_DETAIL,
  SET_SONG_LYRIC,
  SET_DEL_SONG,
  SET_CURRENT_INDEX,
  SET_CURRENT_TIME,
  SET_FAVORITE_SONG,
  SET_FAVORITE_LIST,
  SET_HISTORY_SONG,
  SET_HISTORY_LIST
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
  },
  [SET_CURRENT_TIME](state, curTime) {
    state.curTime = curTime
  },
  // 收藏歌曲
  [SET_FAVORITE_SONG](state, song) {
    //判断收藏的歌曲当中是否已经存在
    let result = state.favoriteList.find(item => {
      return item.id == song.id
    })
    // 如果找到就就返回当前的歌曲

    // 如果没有找到，则返回undefined，然后把该歌曲添加到收藏里，
    if (result === undefined) {
      state.favoriteList.push(song)
    }
  },
  [SET_FAVORITE_LIST](state, list) {
    state.favoriteList = list
  },
  //历史播放歌曲
  [SET_HISTORY_SONG](state, song) {
    let result = state.historyList.find(item => {
      // 如果找到就就返回当前的歌曲
      return item.id == song.id
    })
    // 如果没有找到，则返回undefined，然后把该歌曲添加到历史歌曲列表数组里，
    if (result === undefined) {
      if (state.historyList.length > 30) {
        state.historyList.splice(0,1)
      }
      state.historyList.push(song)
    }
  },
  // 播放历史
  [SET_HISTORY_LIST](state, list) {
    state.historyList = list
  },
}