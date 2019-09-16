import React from 'react';

function MealItem(props) {
  return (
    <div className="meal-item-container">
      <div className="meal-item" style={{backgroundColor: props.color}}>
        {props.meal.title}
      </div>
    </div>
  )
}

export default MealItem
