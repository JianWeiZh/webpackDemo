import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import loadable from '../utils/loadable'
import routers from './routers'

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
    return <Router>
        <Switch>
          {this.state.routers.map((item) => {
            return item.path === '/' ?
              <Route path={item.path} key={item.path} {...item.meta} exact component={loadable(item.component)} />
              :
              <Route path={item.path} key={item.path} {...item.meta} component={loadable(item.component)} />
          })}
        </Switch>
      </Router>
  }
}

export default Routers
