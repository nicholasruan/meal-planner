import React from 'react'
import MealForm from './MealForm'
import { Icon } from 'antd'

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

  render() {
    return (
      <div className="date-col">
				<p>{this.props.date.toDateString()}</p>
				<div className="col-body" style={{backgroundColor: this.props.color}}>

				<div className="meal-item"></div>

				<div className="add-meal-button" onClick={this.showMealForm} style={{cursor:'pointer'}}>
          Add meal <Icon type="plus" className="add-meal-button-icon"/>
        </div>
          <MealForm
            show={this.state.showForm}
            onHide={this.hideMealForm}
            date={this.props.date}
          />
				</div>
      </div>
    )
  }
}

export default MealDate
