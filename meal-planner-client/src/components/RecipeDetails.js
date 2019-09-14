import React from 'react'
import axios from 'axios'

class RecipeDetails extends React.Component {
  state = {
    recipe: {}
  }

  componentDidMount() {
    axios.request({
      method: 'POST',
      url: `https://therecipedb.herokuapp.com/api/getById`,
      headers: {
        'key' : 'miloislife'
      },
      data: {
        'id' : this.props.location.pathname.split('/')[3]
      },
    }).then((response) => {
      // console.log(response.data);
      this.setState({
        recipe: response.data.recipes[0]
      })
    }).catch((error) => {
      console.log(error);
      alert("unable to find recipe");
    })
  }

  render() {
    console.log(this.state.recipe)
    return (
      <div>
      {this.state.recipe.name}
      </div>
    )
  }
}

export default RecipeDetails
