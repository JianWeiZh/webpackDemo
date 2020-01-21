import React from 'react'
import Style from './scss/index.scss'
import utils from '@/utils'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isIos: /(iPhone|iPad|iPod|iOS)/i.test(window.navigator.userAgent),
      showHeader: localStorage.getItem('channel') !== '100',
      isApp: utils.isApp(),
      isCloseWindow: window.location.href.indexOf('isBack=false') >= 0,
      isRotate: false
    }
  }

  goBack() {
    this.props.history.go(-1)
  }

  render() {
    if (this.state.showHeader) {
      const isApp = this.state.isApp
      let tabBar = isApp && <div className={`${Style.topBox} ${this.state.isIos && Style.iosC}`}></div>
      let rightBox = this.props.rightBox || <p className={Style.rightIcon}></p>
      return <div className={Style.opHeader}>
        {tabBar}
        <div className={Style.header}>
          <div className={`${Style.backBtn} ${!this.props.hideBackBtn && Style.backIcon}`} onClick={() => this.goBack()}>{this.props.backTxt}</div>
          <div className={Style.title}>
            <span>{this.props.title}</span>
          </div>
          {rightBox}
        </div>
      </div>
    }
  }
}

export default Header
