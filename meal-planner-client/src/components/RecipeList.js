import React from 'react';
import axios from 'axios';
import RecipeCard from './RecipeCard';
import { Input } from 'antd';
import { Link } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
const { Search } = Input;

class RecipeList extends React.Component {
  state = {
    recipes: [],
    loading: true,
    numberOfRows: 0,
    searchTerm: ''
  }

  getRandom = () => {
    axios.get('https://therecipedb.herokuapp.com/api/getRandom', {
      headers: {
        'key' : 'miloislife'
      }
    }).then((response) => {
      console.log(response.data);
      this.setState({
        recipes: response.data.recipes,
        loading: false,
        numberOfRows: Math.ceil(response.data.recipes.length / 3)
      })
    }).catch((error) => {
      console.log(error);
    })
  }

  componentDidMount() {
    this.getRandom();
  }

  searchName = (value) => {
    if (value.length < 3) {
      alert('search length less than 3');
    } else {
      axios.request({
        method: 'POST',
        url: `https://therecipedb.herokuapp.com/api/searchName`,
        headers: {
          'key' : 'miloislife'
        },
        data: {
          'name' : value
        },
      }).then((response) => {
        // console.log(response.data);
        this.setState({
          recipes: response.data,
          numberOfRows: Math.ceil(this.state.recipes.length / 3)
        })
      }).catch((error) => {
        console.log(error);
        alert("unable to find recipe");
      })
    }
  }

  handleChange = (event) => {
    this.setState({
      searchTerm: event.target.value
    })
  }

  clearSearch = () => {
    this.setState({
      searchTerm: ''
    })
  }

  sayHello = () => {
    alert('Hello!');
  }

  render() {
    // console.log(this.state.recipes);
    // const recipeArr = this.state.recipes.filter(recipe => recipe.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()));

    // const value = 0;

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
          {this.props.formMode ? null : <h1 className="page-title">Meals</h1>}
          <div className="container">
            {this.props.formMode ? null : <p>poop</p>}
            <div className="search-bar">
              <Search
                placeholder="Search..."
                value={this.state.searchTerm}
                onSearch={value => this.searchName(value)}
                onChange={this.handleChange}
              /><button type="button" className="btn btn-primary" onClick={() => {this.getRandom(); this.clearSearch();} }>Clear</button>
            </div>

            {Array(this.state.numberOfRows).fill().map((_, rowIndex) => (
                <div className="row" key={rowIndex}>
                 {
                  this.props.formMode ?
                  this.state.recipes.slice(rowIndex * 3, (rowIndex *3) + 3).map((index, value) => {
                     const i = value + rowIndex * 3;
                    return <div className="col-md-4">
                      <RecipeCard
                      customClickEvent={() => {this.props.handleMealSelect(this.state.recipes[i].id)}}
                      key={this.state.recipes[i].id}
                      id={this.state.recipes[i].id}
                      name={this.state.recipes[i].name}
                      imageurl={this.state.recipes[i].imageurl}
                      selectedMeal={this.props.selectedMeal}
                      formMode={this.props.formMode}
                      />
                    </div>
                  }) :
                  this.state.recipes.slice(rowIndex * 3, (rowIndex *3) + 3).map((index, value) => {
                     const i = value + rowIndex * 3;
                    return <div className="col-md-4">
                      <Link to={`/home/meals/${this.state.recipes[i].id}`} target="_blank"><RecipeCard
                      customClickEvent={() => {this.props.selectRecipe(this.state.recipes[i])}}
                      key={this.state.recipes[i].id}
                      name={this.state.recipes[i].name}
                      imageurl={this.state.recipes[i].imageurl}
                      /></Link>
                    </div>
                  })
                }
                </div>
            ))}
          </div>
        </div>
      )
    }
  }
}

export default RecipeList
