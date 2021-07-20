export const createRandomIndex = (length) => {
    let i = Math.floor(Math.random() * length)
    return i
}

// 江哥的
// export const createRandomIndex = (min,max) => {
//   min = Math.ceil(min) // 返回大于或等于给定数字的最小整数。 向上取整（有小数，整数部分就+1
//   max = Math.floor(max) //向下取整（<= 该数值的最大整数，和parseInt()一样)
//   return Math.floor(Math.random() * (max-min + 1)+min) //含最大值，最小值
// }