import './home.css'
import './../about/about.css'
import './index.scss'
export function cs01() {
  console.log(78911)
  const arr = [1,2,3,4,5,6,7,8,9]
  const Num = arr.reduce((preVal, val) => {
    return preVal + val
  })
  console.log(Num)
}
