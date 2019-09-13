import React from 'react'
import { Icon} from 'antd'

class MealDate extends React.Component {
  render() {
    return (
      <div className="date-col">
				<p>{this.props.date}</p>
				<div className="col-body" style={{backgroundColor: this.props.color}}>

				<div className="meal-item"></div>

				<div className="add-meal-button" onClick={() => alert('add a meal ya dog cunt')} style={{cursor:'pointer'}}>Add meal <Icon type="plus" className="add-meal-button-icon"/></div>
				</div>
      </div>
    )
  }
}

export default MealDate
