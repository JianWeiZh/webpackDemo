import React from 'react'
import style from  './index.scss'

class Home extends React.Component{
  constructor (props) {
    super(props)
  }
  goBack() {
    this.props.history.go(-1)
  }
  render() {
    return <div className={style.box}>
      我是home页
      <button onClick={() => this.goBack()}>返回</button>
    </div>
  }
}

export default Home
