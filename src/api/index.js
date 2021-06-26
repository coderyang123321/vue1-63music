import request from './request'

// banner
export const getBanner = (params) => request.get('/banner',{params})

// 推荐歌单
export const getPersonalized = (params) => request.get('/personalized', { params })

// 最新专辑
export const getNewAlbum = (params) => request.get('/album/newest',{params})

// 最新音乐
export const getNewSong = (params) => request.get('/personalized/newsong', { params })

// 歌单详情
export const getSongDetail = (params) => request.get('/playlist/detail',{params})