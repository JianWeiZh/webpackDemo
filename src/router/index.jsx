import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import loadable from '../utils/loadable'
import routers from './routers'
import OpJsSdk from '@/utils/optimus-js-sdk'
import MyContext from '@/components/MyContext'
import ErrorBoundaries from '@/components/ErrorBoundaries'

class Routers extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      routers
    }
  }

  componentDidMount() {
    console.log(this.state)
  }

  render() {
    return <ErrorBoundaries>
      <MyContext.Provider value={OpJsSdk}>
        <Router>
          <Switch>
            {this.state.routers.map((item) => {
              return item.path === '/' ?
                <Route path={item.path} key={item.path} exact component={loadable(item.component)} />
                :
                <Route path={item.path} key={item.path} component={loadable(item.component)} />
            })}
          </Switch>
        </Router>
      </MyContext.Provider>
    </ErrorBoundaries>
  }
}

export default Routers
