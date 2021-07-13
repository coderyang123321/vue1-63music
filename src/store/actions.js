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

}
  from "./mutations-type"
import { fetchSongDetail, getSongLyric,getSongUrl } from "@/api/index.js"
import {parseLyric} from "@/utils/parseLyric"
export default {
  // setFullScreen({ commit }, flag) {
  //       commit('changeFullScreen',flag)
  //     }


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
      obj.url = res1.data[i].url
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
    // console.log(obj);
  },
  setDelSong({ commit }, index) {
    commit(SET_DEL_SONG,index)
  },
  setCurrentIndex({ commit }, index) {
    commit(SET_CURRENT_INDEX,index)
  },
}