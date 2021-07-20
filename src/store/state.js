import mode from './modelType'
export default {
  isFullScreen: false,
  isShowMiniPlayer: false,
  isShowListPlayer:false,
  isPlaying: false,
  modeType: mode.loop,
  songs: [],
  currentSong: {},
  currentIndex:0,
  currentLyric: {},
  curTime: 0,
  favoriteList: [],//保存收藏的歌曲
  historyList:[]//历史记录
}