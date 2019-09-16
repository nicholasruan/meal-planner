import React from 'react';

function MealItem(props) {
  return (
    <div className="meal-item-container">
      <div className="meal-item">
        {props.meal.title}
      </div>
    </div>
  )
}

export default MealItem
