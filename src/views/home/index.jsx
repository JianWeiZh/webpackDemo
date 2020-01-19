import React from 'react'
import style from './index.scss'
import Header from '@/components/header'

class Home extends React.PureComponent{
  constructor (props) {
    super(props)
    this.state = {
      backTxt: '返回'
    }
  }
  //
  // static getDerivedStateFromProps(a) {
  //   console.log(a)
  // }

  // getSnapshotBeforeUpdate(prevProps, prevState) {
  //   console.log(prevProps, prevState)
  // }

  componentDidUpdate(a) {
    console.log(a)
  }

  // shouldComponentUpdate(nextProps, nextState, nextContext) {
  //   console.log(nextProps, nextState, nextContext)
  // }

  goBack() {
    this.setState({
      backTxt: '更新'
    })
  }

  render() {
    return <div className={style.box}>
            <Header backTxt={this.state.backTxt} history={this.props.history}></Header>
            <div className={style.content}>
              <div className="iconfont iconright">按钮</div>
              我是home页
              <button onClick={() => this.goBack()}>返回</button>
            </div>
          </div>
  }
}

export default Home
