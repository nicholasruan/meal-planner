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
    console.log(this.state.recipes);
    // const recipeArr = this.state.recipes.filter(recipe => recipe.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()));

    const value = 0;

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
                value={this.state.searchTerm}
                onSearch={value => this.searchName(value)}
                onChange={this.handleChange}
              /><button type="button" class="btn btn-primary" onClick={() => {this.getRandom(); this.clearSearch();} }>Clear</button>
            </div>

            {Array(this.state.numberOfRows).fill().map((_, rowIndex) => (
                <div className="row" key={rowIndex}>
                 {
                   this.state.recipes.slice(rowIndex * 3, (rowIndex *3) + 3).map((index, value) => {
                     const i = value + rowIndex * 3;
                    return <div className="col-md-4">
                      <RecipeCard
                      customClickEvent={this.sayHello}
                      key={this.state.recipes[i].id}
                      name={this.state.recipes[i].name}
                      imageurl={this.state.recipes[i].imageurl}
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
