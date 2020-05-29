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
      return (
        <MealItem
          key={meal.title}
          meal={meal}
          color={'#F0E1BF'}
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
          Add Meal <Icon type="plus" className="add-meal-button-icon"/>
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
