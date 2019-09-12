import React from 'react'
import axios from 'axios'
import RecipeCard from './RecipeCard'
import { Input } from 'antd';

const { Search } = Input;

class Meal extends React.Component {
  state = {
    recipes: [],
    loading: true
  }

  componentDidMount() {
    axios.get('https://therecipedb.herokuapp.com/api/recipes', {
      headers: {
        'key' : 'miloislife'
      }
    }).then((response) => {
      console.log(response.data);
      this.setState({
        recipes: response.data.recipes,
        loading: false
      })
    }).catch((error) => {
      console.log(error);
    })
  }

  render() {
    const recipeArr = this.state.recipes;

    const numberOfRows = Math.ceil(recipeArr.length / 3)
    const value = 0;


    recipeArr.map((key, value) => console.log(recipeArr[value].name));


    if (this.state.loading) {
      return(
        <h1>Loading...</h1>
      )
    } else {
      return (
        <div>
          <h1>Meals</h1>



          <div className="container">
            <div className="search-bar">
              <Search placeholder="input search text" onSearch={value => console.log(value)} enterButton />
            </div>

            {Array(numberOfRows).fill().map((_, rowIndex) => (
                <div className="row" key={rowIndex}>
                 {
                   recipeArr.slice(rowIndex * 3, (rowIndex *3) + 3).map((index, value) => {
                     const i = value + rowIndex * 3;
                    return <div className="col-md-4">
                      <RecipeCard
                      name={recipeArr[i].name}
                      imageurl={recipeArr[i].imageurl}
                      />
                    </div>
                  })}
                </div>
            ))}



          </div>

        </div>
      )
    }
  }
}

export default Meal
