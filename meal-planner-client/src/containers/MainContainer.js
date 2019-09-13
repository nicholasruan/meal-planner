import React from 'react'
import NavBar from '../components/NavBar'
import Planner from '../components/Planner'
import Meal from '../components/Meal'
import Profile from '../components/Profile'
import { Route, Switch } from 'react-router-dom'
import fire from '../config/fire'

class MainContainer extends React.Component {
  handleLogout = () => {
      fire.auth().signOut()
      .then(function() {
        console.log('successful logout')
        localStorage.user_id = ""
      }).catch(function(error) {
        console.log(error);
      });
    this.props.routerProps.history.push("/")
  }

  render() {
    return (
      <div className='home'>
        <NavBar logout={this.handleLogout}/>
        <Switch>
          <Route exact path="/home" render={(routerProps) => <Planner {...routerProps} />} />
          <Route path="/home/meals" render={(routerProps) => <Meal {...routerProps} />} />
          <Route path="/home/profile" render={(routerProps) => <Profile {...routerProps} />} />

        </Switch>
      </div>
    )
  }
}

export default MainContainer
