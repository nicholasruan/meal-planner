import React from 'react'
import axios from 'axios'

class Meal extends React.Component {
  state = {
    recipes: []
  }

  componentDidMount() {
    axios.get('https://therecipedb.herokuapp.com/api/recipes', {
      headers: {
        'key' : 'miloislife'
      }
    }).then((response) => {
      console.log(response.data);
      this.setState({ recipes: response.data.recipes})
    }).catch((error) => {
      console.log(error);
    })
  }

  render() {
    const elements = this.state.recipes;
    elements.map((key, value) => console.log(elements[value].name));
    // console.log(elements)
    return (
      <div>
        <h1>Meals</h1>

        <h2>SEARCH BAR GOES HERE</h2>
        <ul>
          {elements.map((index, value) => {
            return <li key={index}>{elements[value].name}<div className="food-image"><img src={elements[value].imageurl}></img></div>
            </li>
          })}
        </ul>
      </div>
    )
  }
}

export default Meal
