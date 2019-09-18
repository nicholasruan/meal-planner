import React from 'react'
import axios from 'axios'
import ClipLoader from 'react-spinners/ClipLoader';

class RecipeDetails extends React.Component {
  state = {
    recipe: {},
    loading: true
  }

  componentDidMount() {
    axios.request({
      method: 'POST',
      url: `https://therecipedb.herokuapp.com/api/getById`,
      headers: {
        'key' : 'miloislife'
      },
      data: {
        'id' : this.props.menuItemMode ? this.props.recipeId : this.props.location.pathname.split('/')[3]
      },
    }).then((response) => {
      // console.log(response.data);
      this.setState({
        recipe: response.data.recipes[0],
        loading: false
      })
    }).catch((error) => {
      console.log(error);
      alert("unable to find recipe");
    })
  }

  render() {
    console.log(this.state.recipe);
    let imgStyle = { backgroundImage: `url(${this.state.recipe.imageurl})`};
    console.log(imgStyle);
    if (this.state.loading) {
      return(
        <div style={{marginTop: '80px'}}>
        <ClipLoader
          sizeUnit={"px"}
          size={120}
          color={'#082D0F'}
        />
      </div>
      )
    } else {
      return (
        <div className="container" id={this.props.menuItemMode ? "recipe-details-container-menuitemmode": "recipe-details-container" }>
          <h2>{this.state.recipe.name}</h2>
          <p>Category: {this.state.recipe.category}</p>
          <div className={this.props.menuItemMode ? "sub-container-menuitemmode" : "sub-container"}>

          <div className="food-detail-image-container">
            <div className="img" style={{backgroundImage: "url(" + this.state.recipe.imageurl + ")"}}></div>
          </div>
            <ul className="ingredients-list">
              {this.state.recipe.ingredients.map(ingredient => {
                return (
                  <li className="ingrident-list-item">{ingredient}</li>
                )
              })}
            </ul>
          </div>
          <div className={this.props.menuItemMode ? "directions-menuitemmode" : "directions"}>
            <p>{this.state.recipe.directions}</p>
          </div>
        </div>
      )
    }
  }
}

export default RecipeDetails
