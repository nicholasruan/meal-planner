import React from 'react'
import axios from 'axios';
import MealDate from './MealDate'
import Button from 'react-bootstrap/Button';
import ClipLoader from 'react-spinners/ClipLoader';

class Planner extends React.Component {
  state = {
    meals: [],
    loading: true,
    numDays: 7,
    monthView: false,
    weekView: true
  }

  createDateArrays = () => {
    const days = [];
    let today = new Date();
    days.push(today);

    for(let i = 1; i < 28; i++) {
      let day0 = new Date();
      days.push(new Date(day0.setDate(day0.getDate() + i)));
    }
    return days;
  }

  componentDidMount() {
    localStorage.current = 'planner'
    axios.request({
      method: 'POST',
      url: `https://us-central1-meal-planner-164c3.cloudfunctions.net/app/getMeals`,
      data: {
        'uid': localStorage.user_id
      },
    }).then((response) => {
      this.setState({
        meals: response.data,
        loading: false
      })
      console.log(this.state.meals);
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

  removeMealFromState = (removeDocId) => {
    let mealsTemp = [...this.state.meals];
    let updatedMeal = mealsTemp.filter((item) => {
      if (item.docId) {
        return !item.docId.includes(removeDocId);
      }
    });
    this.setState({
      meals: updatedMeal
    })
  }


  renderMealCols = (numDays) => {
    let dayArr = this.createDateArrays();
    let rows = [];

    let colors = [
      '#9dc5bb',
      '#84c3b3',
      '#a3dcce',
      '#9dc5bb',
      '#84c3b3',
      '#a3dcce',
      '#9dc5bb',
      '#84c3b3',
      '#a3dcce',
      '#9dc5bb',
      '#84c3b3',
      '#a3dcce',
      '#9dc5bb',
      '#84c3b3',
      '#a3dcce',
      '#9dc5bb',
      '#84c3b3',
      '#a3dcce',
      '#9dc5bb',
      '#84c3b3',
      '#a3dcce',
      '#9dc5bb',
      '#84c3b3',
      '#a3dcce',
      '#9dc5bb',
      '#84c3b3',
      '#a3dcce',
      '#9dc5bb',
    ];


    for (let i = 0; i < numDays; i++) {
      const meals = this.state.meals.filter(meal => meal.date === this.formatDate(dayArr[i]))
      rows.push(
        <MealDate
          key={i}
          date={dayArr[i]}
          color={colors[i]}
          formatDate={this.formatDate}
          meals={meals}
          addMealToState={this.addMealToState}
          removeMealFromState={this.removeMealFromState}
        />);
    }

    return <div className="row">{rows}</div>;
  }

  render() {
    console.log(this.state.meals);
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
          <h1 className="page-title">Meal Planner</h1>
          <div className="container">
            <div className="button-container">
            <Button id={this.state.weekView ? "button-weekly-active" : "button-weekly"}  variant="primary" onClick={() => this.setState({
                numDays: 7,
                monthView: false,
                weekView: true
              })}>Week View</Button><Button id={this.state.monthView ? "button-monthly-active" : "button-monthly"}  variant="primary" onClick={() =>
              this.setState({
                numDays: 28,
                monthView: true,
                weekView: false
              })}>Month View</Button>
            </div>
            {this.renderMealCols(this.state.numDays)}

          </div>
          <div className={this.state.monthView ? "scroll-down" : "scroll-down-hidden"}>↓Scroll Down↓</div>
        </div>
      )
    }
  }
}

export default Planner
