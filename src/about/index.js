import "./about.css"
import "./../home/home.css"

var oDiv = document.createElement('div')
oDiv.innerText = API_CONFIG.FOO_API
document.body.appendChild(oDiv)

export function cs() {
  console.log(123)
}

export function square(x) {
  return x * x
}
