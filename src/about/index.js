import "./about.css"
import "./../home/home.css"

const oDiv = document.createElement('div')
oDiv.innerText = API_CONFIG.FOO_API
document.body.appendChild(oDiv)

setTimeout(() => {
  console.log('setTimeout')
})
const P1 = new Promise(function(provide, reject) {
  console.log('promise')
  setTimeout(() => {
    console.log('provide')
    return provide()
  }, 1000)
})

export function cs() {
  P1.then(() => {
    console.log('Promise provide console')
    setTimeout(() => {
      console.log('Promise provide setTimeout console')
    })
  }).catch((err) => {
    console.log(err)
  })
}

export function square(x) {
  return x * x
}
