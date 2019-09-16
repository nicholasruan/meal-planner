import React from 'react';

function MealItem(props) {
  return (
    <div className="meal-item">
      {props.meal.title}
    </div>
  )
}

export default MealItem
