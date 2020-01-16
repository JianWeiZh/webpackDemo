import React from 'react'
import style from './app.scss'
import MyContext from '@/components/MyContext'

class App extends React.Component {
  constructor(props){
    super(props)
  }

  static contextType = MyContext

  componentDidMount() {
    let value = this.context
    console.log(value)
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    console.log('shouldComponentUpdate', newtProps, nextState, newtContext)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('componentDidUpdate', prevProps, prevState, snapshot)
  }

  componentWillUnmount() {
    console.log('componentWillUnmount')
  }

  goNext(path) {
    this.props.history.push(`/${path}`)
  }

  render() {
    return <div className={style.app}>
        <span className={style.labelItem} onClick={() => this.goNext('home')}>home</span>
        <span className={style.labelItem} onClick={() => this.goNext('about')}>about</span>
        <div className="iconfont iconright">按钮</div>
      </div>
  }
}

export default App
