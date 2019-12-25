import React from 'react'
import Home from '@/home'
import About from '@/about'

class App extends React.Component {
  constructor(props){
    super(props)
  }
  componentDidMount() {
    console.log('componentDidMount')
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

  render() {
    return <div>
      Hello word
      <Home />
      <About></About>
    </div>
  }
}

export default App
