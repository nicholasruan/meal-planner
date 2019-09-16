import React from 'react'
import axios from 'axios';
import MealDate from './MealDate'

class Planner extends React.Component {
  state = {
    meals: []
  }

  createDateArrays = () => {
    const days = [];
    let today = new Date();
    days.push(today);

    for(let i = 1; i < 14; i++) {
      let day0 = new Date();
      days.push(new Date(day0.setDate(day0.getDate() + i)));
    }
    return days;
  }

  componentDidMount() {
    axios.request({
      method: 'POST',
      url: `https://us-central1-meal-planner-164c3.cloudfunctions.net/app/getMeals`,
      data: {
        'uid': localStorage.user_id
      },
    }).then((response) => {
      this.setState({
        meals: response.data
      })
    }).catch((error) => {
      console.log(error);
      alert("unable to find recipe");
    })
  }

  formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const newDate = `${year}-${month}-${day}`

    return newDate
  }

  addMealToState = (meal) => {
    let mealsTemp = [...this.state.meals];
    mealsTemp.push(meal);
    this.setState({
      meals: mealsTemp
    })
  }

  renderMealCols = () => {
    let dayArr = this.createDateArrays();
    let rows = [];

    let colors = [
      '#9dc5bb',
      '#84c3b3',
      '#a3dcce',
      '#9dc5bb',
      '#84c3b3',
      '#a3dcce',
      '#9dc5bb'
    ];


    for (let i = 0; i < 7; i++) {
      const meals = this.state.meals.filter(meal => meal.date === this.formatDate(dayArr[i]))

      rows.push(
        <MealDate
          key={i}
          date={dayArr[i]}
          color={colors[i]}
          formatDate={this.formatDate}
          meals={meals}
          addMealToState={this.addMealToState}
        />);
    }

    return <div className="row">{rows}</div>;
  }

  render() {
    console.log(this.state.meals)
    return (
      <div>
        <h1 className="page-title">Weekly Meal Planner</h1>
        <div className="container">
          {this.renderMealCols()}
        </div>
      </div>
    )
  }
}

export default Planner
