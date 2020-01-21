import React from 'react'
import style from './app.scss'
import MyContext from '@/components/MyContext'
import Header from '@/components/header'
import { Button, InputItem, List, SegmentedControl, WingBlank } from 'antd-mobile'

const Item = List.Item
const Brief = Item.Brief

class App extends React.PureComponent {
  constructor(props){
    super(props)
    this.state = {
      inputVal: '',
      todoList: [],
      tabList: ['待办列表', '已完成列表'],
      tabIndex: 0
    }
  }

  static contextType = MyContext

  componentWillUnmount() {
    console.log('componentWillUnmount')
  }

  componentWillUpdate() {
    console.log(this.state.todoList)
  }

  add() {
    if (this.state.inputVal === '') return
    const todoList = this.state.todoList
    const obj = {
      state: 0,
      value: this.state.inputVal
    }
    this.setState({
      inputVal: '',
      todoList: [obj, ...todoList]
    })
  }

  remove(i) {
    const todoList = [...this.state.todoList]
    todoList.splice(i, 1)
    this.setState({
      inputVal: '',
      todoList: todoList
    })
  }

  setInputVal(e) {
    this.setState({
      inputVal: e
    })
  }

  tabChange(e) {
    this.setState({
      tabIndex: e.nativeEvent.selectedSegmentIndex
    })
  }

  goNext(path) {
    this.props.history.push(`/${path}`)
  }

  setStatus(i) {
    console.log(i, this.state.todoList[i])
    const newList = this.state.todoList
    newList[i].state = newList[i].state === 0 ? 1 : 0
    this.setState({
      todoList: [...newList]
    })
  }

  render() {
    return <div className={style.app}>
      <Header title="To Do List" hideBackBtn={true}></Header>
      <div className={style.todoListBox}>
        <InputItem
          placeholder="请输入待办事项"
          autoAdjustHeight={true}
          maxLength={30}
          value={this.state.inputVal}
          onKeyUp={(e) => e.keyCode === 13 && this.add()}
          onChange={(event) => this.setInputVal(event)}>
          <Button type="primary" size={'small'} inline="true" onClick={() => this.add()}>确定</Button>
        </InputItem>
      </div>
      <WingBlank
        size="lg"
        className={style.tabBox}>
        <SegmentedControl
          selectedIndex={this.state.tabIndex}
          values={this.state.tabList}
          onChange={e => this.tabChange(e)} />
      </WingBlank>
      <List className={`my-List ${style.todoListBox}`}>
        {this.state.todoList.map((item, index) => {
          if (item.state === this.state.tabIndex) {
            return <Item key={item.value + index} className={`${style.todoItem} ${item.state === 0 ? style.activeItem : style.activitedItem}`}>
              <span className={`iconfont icon-close ${style.closeBtn}`} onClick={() => this.remove(index)}></span>
              {item.value}
              {this.state.tabIndex === 0 && <Button type="primary" size="small" inline={true} className={style.statusBtn} onClick={() => this.setStatus(index)}>完成</Button>}
            </Item>
          }
        })}
      </List>
      <div className={style.bottomBox}>
        <span className={style.labelItem} onClick={() => this.goNext('home')}>home</span>
        <span className={style.labelItem} onClick={() => this.goNext('about')}>about</span>
      </div>
    </div>
  }
}

export default App
