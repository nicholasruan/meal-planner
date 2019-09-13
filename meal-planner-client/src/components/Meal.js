import React from 'react'
import axios from 'axios'
import RecipeCard from './RecipeCard'
import { Input } from 'antd';
import ClipLoader from 'react-spinners/ClipLoader';
const { Search } = Input;


class Meal extends React.Component {
  state = {
    recipes: [],
    loading: true,
    searchTerm: ''
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

  handleSearchChange = (event) => {
    this.setState({
      searchTerm: event.target.value
    })
  }

  render() {
    const recipeArr = this.state.recipes.filter(recipe => recipe.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()));
    const numberOfRows = Math.ceil(recipeArr.length / 3)
    const value = 0;
    recipeArr.map((key, value) => console.log(recipeArr[value].id));


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
        <div>
          <h1 className="page-title">Meals</h1>
          <div className="container">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac condimentum dolor, nec luctus lacus. Aenean viverra est non dolor dignissim, nec commodo dolor suscipit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla scelerisque vestibulum lacinia. Donec tortor nibh, tincidunt non sem quis, vulputate ullamcorper leo. Morbi euismod pharetra fringilla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras pulvinar orci nulla, ut feugiat tellus ornare eget. Fusce aliquet diam a semper dapibus.</p>
            <div className="search-bar">
              <Search
                placeholder="Search..."
                onChange={this.handleSearchChange}
                value={this.state.searchTerm}
              />
            </div>

            {Array(numberOfRows).fill().map((_, rowIndex) => (
                <div className="row" key={rowIndex}>
                 {
                   recipeArr.slice(rowIndex * 3, (rowIndex *3) + 3).map((index, value) => {
                     const i = value + rowIndex * 3;
                    return <div className="col-md-4">
                      <RecipeCard
                      key={recipeArr[i].id}
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
