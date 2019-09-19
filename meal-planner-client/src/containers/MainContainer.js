import React from 'react'
import NavBar from '../components/NavBar'
import Planner from '../components/Planner'
import RecipeList from '../components/RecipeList'
import Profile from '../components/Profile'
import AddRecipe from '../components/AddRecipe'
import RecipeDetails from '../components/RecipeDetails'
import ShoppingList from '../components/ShoppingList'
import { Route, Switch } from 'react-router-dom'
import fire from '../config/fire'

class MainContainer extends React.Component {
  state = {
    selectedRecipe: {}
  }

  selectRecipe = (recipe) => {
    this.setState({
      selectedRecipe: recipe
    })
  }

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
          <Route exact path="/home/meals" render={(routerProps) => <RecipeList {...routerProps} selectRecipe={this.selectRecipe} formMode={false} />} />
          <Route path="/home/meals/:id" render={(routerProps) => {
            return <RecipeDetails {...routerProps} recipe={this.state.selectedRecipe} />
          }}/>
          <Route path="/home/profile" render={(routerProps) => <Profile {...routerProps} />} />
          <Route path="/home/addrecipe" render={(routerProps) => <AddRecipe {...routerProps} />} />
          <Route path="/home/shoppinglist" render={(routerProps) => <ShoppingList {...routerProps} />} />
        </Switch>
      </div>
    )
  }
}

export default MainContainer
