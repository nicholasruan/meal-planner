import React from 'react'
import MealDate from './MealDate'

class Planner extends React.Component {

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
      rows.push(<MealDate
        date={dayArr[i].toDateString()}
        color={colors[i]}
        />);
    }

    return <div className="row">{rows}</div>;
  }

  render() {
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
