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
}
  from "./mutations-type"
import { fetchSongDetail, getSongLyric,getSongUrl } from "@/api/index.js"
import {parseLyric} from "@/utils/parseLyric"
export default {

  //显示隐藏播放页面
  setFullScreen({ commit }, flag) {
    commit(SET_FULL_SCREEN,flag)
  },

  //显示隐藏迷你播放
  showMiniPlaying({ commit }, flag) {
    commit(SHOW_MINI_PLAYING,flag)
  },

  //显示隐藏列表播放
  showListPlaying({ commit }, flag) {
    commit(SHOW_LIST_PLAYING,flag)
  },
  // 设置播放模式
  setIsPlaying({ commit }, flag) {
    commit(SET_IS_PLAY,flag)
  },
  setModeType({ commit }, flag) {
    commit(SET_MODE_TYPE,flag)
  },
  async getSongDetail({ commit }, ids) {
    const res = await fetchSongDetail({ ids: ids.join(',') })
     //获取播放地址
     const res1 = await getSongUrl({ id: ids.join(',') })
    let list = []
    res.songs.forEach((value,i) => {
      let obj = {}
      obj.id = value.id
      obj.name = value.name
      // obj.url = res1.data[i].url // 不能直接赋值，点击全部播放的时候会出现给歌词不对版的，需要判断
      for (let j = 0; j < res1.data.length; j++) {
        let item = res1.data[j]
        if (value.id === item.id) {
          obj.url = item.url
          break
        }
      }
      let singer = ''
      value['ar'].forEach((item,index) => {
        if (index === 0) {
          singer = item.name
        } else {
          singer += '-'+ item.name
        }
      })
      obj.singer = singer
      obj.picUrl = value['al'].picUrl
      list.push(obj)
    });
    commit(SET_SONG_DETAIL,list)
  },
  async getCurrentLyric({ commit }, id) {
    // 获取歌词
    const res = await getSongLyric({ id: id })
      // console.log(res);
    // 解析歌词
    if (res.lrc.lyric) {
      let obj = parseLyric(res.lrc.lyric)
    commit(SET_SONG_LYRIC,obj)

    }
  },
  setDelSong({ commit }, index) {
    commit(SET_DEL_SONG,index)
  },
  setCurrentIndex({ commit }, index) {
    commit(SET_CURRENT_INDEX,index)
  },
  setCurrentTime({ commit }, curTime) {
    commit(SET_CURRENT_TIME,curTime)
  },
  setFavoriteSong({ commit }, song) {
    commit(SET_FAVORITE_SONG,song)
  },
  setFavoriteList({ commit }, list) {
    commit(SET_FAVORITE_LIST,list)
  },
  setHistorySong({ commit }, song) {
    commit(SET_HISTORY_SONG,song)
  },
  setHistryList({ commit }, list) {
    commit(SET_HISTORY_LIST,list)
  },

  
}