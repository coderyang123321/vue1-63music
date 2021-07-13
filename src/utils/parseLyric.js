export const parseLyric = function (lyc) {
  let lyrics = lyc.split('\n')
  // [00:00.000] 作词 : 魏如萱 waa wei
    // 1定义正在提取 [00:00.000]
  let reg1 = /\[\d*:\d*\.\d*\]/g
  // 2 提取[00
  let reg2 = /\[\d*/i
  
  // 3. 提取 :00
  let reg3 = /\:\d*/i
  // 4 定义对象保存处理好的歌词
  let lyricObj = {}
  lyrics.forEach((lyric) => {
    // 1提取时间
    let timeStr = lyric.match(reg1)
    if (!timeStr) { return }
    timeStr = timeStr[0]
    // 2提取分钟
    let minStr = timeStr.match(reg2)[0].substr(1)
    // 3提取秒
    let secondStr = timeStr.match(reg3)[0].substr(1)

    // 4合并时间，将分钟和秒钟都合为秒钟
    let time = parseInt(minStr) * 60 + parseInt(secondStr)

    // 5 处理歌词
    let text = lyric.replace(reg1, "").trim()
    
    // 6 保存
    lyricObj[time] = text
  })
  return lyricObj
}