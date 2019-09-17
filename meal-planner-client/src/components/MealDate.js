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
      let colors = ['#9ebae6', '#c3e69e', '#e6bd9e', '#e0abf5', '#fcf2ac', '#bbfcac', '#acbdfc'];
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
    return (
      <div className="date-col">
				<p>{this.props.date.toDateString()}</p>
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
