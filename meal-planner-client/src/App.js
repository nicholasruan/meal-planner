import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Login from './components/Login'
import SignUp from './components/SignUp'
import MainContainer from './containers/MainContainer'


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage}/>
        <Route path="/login" component={Login}/>
        <Route path="/signup" render={(routerProps) => <SignUp routerProps={routerProps} />}/>
        <Route path="/home" render={(routerProps) => <MainContainer routerProps={routerProps} />} />
      </Switch>
    </div>
  );
}

export default App;
