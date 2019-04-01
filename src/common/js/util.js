import $ from 'jquery'
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle(arr) {
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

export function debounce(func, delay) {
  let timer

  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

export function hideVideo(state) {
  let videoClass = $("video")
  if(state){
    const u = navigator.userAgent
    if (u.indexOf('Android' > -1) || u.indexOf('Linux') > -1) {
      videoClass.hide()
    }
  }else {
    videoClass.show()
  }
}
