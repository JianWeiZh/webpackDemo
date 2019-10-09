import "./about.css"
import "./../home/home.css"

var oDiv = document.createElement('div')
oDiv.innerText = 'hello webpack'
document.body.appendChild(oDiv)

export function cs() {
  console.log(123)
}

export function square(x) {
  return x * x
}
