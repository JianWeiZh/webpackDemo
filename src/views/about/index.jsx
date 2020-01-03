import React from 'react'
import style from  "./about.scss"

class About extends React.Component{
  constructor(props) {
    super(props)
  }
  goBack() {
    this.props.history.go(-1)
  }
  render() {
    return <div className={style.about} onClick={() => this.goBack()}>
      <h1 className={style.title}>我是h1</h1>
      我是about页
    </div>
  }
}

export default About
