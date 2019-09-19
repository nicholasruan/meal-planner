import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Login from './components/Login'
import ForgotPassword from './components/ForgotPassword'
import SignUp from './components/SignUp'
import MainContainer from './containers/MainContainer'
import PageNotFound from './components/PageNotFound'


class App extends React.Component {
  componentDidMount() {
    const pathNames = [
      "/",
      "/login",
      "/forgotpassword",
      "/signup"
    ]

    if (!localStorage.user_id && !pathNames.includes(this.props.location.pathname)) {
      this.props.history.push("/404")
    }
  }

  render() {
    console.log(this.props.location.pathname)
    return (
      <div className="App">
      <Switch>
      <Route exact path="/" component={LandingPage}/>
      <Route path="/login" component={Login}/>
      <Route path="/forgotpassword" component={ForgotPassword}/>
      <Route path="/signup" render={(routerProps) => <SignUp routerProps={routerProps} />}/>
      <Route path="/home" render={(routerProps) => <MainContainer routerProps={routerProps} />}/>
      <Route path="/404" component={PageNotFound}/>
      </Switch>
      </div>
    );
  }
}

export default App;
