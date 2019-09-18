import React from 'react';
import MealForm from './MealForm';
import MealItem from './MealItem';
import { Icon } from 'antd';

class MealDate extends React.Component {
  state = {
    showForm: false
  }

  showMealForm = () => {
    this.setState({
      showForm: true
    })
  }

  hideMealForm = () => {
    this.setState({
      showForm: false
    })
  }

  renderMealItems = () => {
    return this.props.meals.map(meal => {
      let colors = [
        "#ffeaa7",
        "#fdcb6e",
        "#fab1a0",
        "#f6e58d",
        "#ffbe76",
        "#ff7979",
        "#FEA47F",
        "#F97F51",
        "#ffdd59",
        "#ffc048",
      ];
      let rand = colors[Math.floor(Math.random() * colors.length)];
      return (
        <MealItem
          key={meal.title}
          meal={meal}
          color={rand}
          removeMealFromState={this.props.removeMealFromState}
          />
      )
    })
  }

  render() {
    let titleDate = this.props.date.toDateString().substring(0, this.props.date.toDateString().length - 5);
    return (
      <div className="date-col">
				<p>{titleDate}</p>
				<div className="col-body" style={{backgroundColor: this.props.color}}>

				<div className="meal-items">
          {this.props.meals.length === 0 ? null : this.renderMealItems()}
        </div>

				<div className="add-meal-button" onClick={this.showMealForm} style={{cursor:'pointer'}}>
          Add meal <Icon type="plus" className="add-meal-button-icon"/>
        </div>
          <MealForm
            show={this.state.showForm}
            onHide={this.hideMealForm}
            date={this.props.formatDate(this.props.date)}
            addMealToState={this.props.addMealToState}
          />
				</div>
      </div>
    )
  }
}

export default MealDate
