import React from 'react'
import NavBar from '../components/NavBar'
import Planner from '../components/Planner'
import Meal from '../components/Meal'
import { Route, Switch } from 'react-router-dom'

class MainContainer extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/home" render={(routerProps) => <Planner {...routerProps} />} />
          <Route path="/home/meals" render={(routerProps) => <Meal {...routerProps} />} />
        </Switch>
      </div>
    )
  }
}

export default MainContainer
