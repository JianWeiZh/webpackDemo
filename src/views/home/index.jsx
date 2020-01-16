import React from 'react'
import style from './index.scss'

class Home extends React.Component{
  constructor (props) {
    super(props)
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    console.log(nextProps, nextState, nextContext)
  }

  goBack() {
    this.props.history.go(-1)
  }

  render() {
    return <div className={style.box}>
      <div className="iconfont iconright">按钮</div>
      我是home页
      <button onClick={() => this.goBack()}>返回</button>
    </div>
  }
}

export default Home
