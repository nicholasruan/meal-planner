import React from 'react';
import MealItemDetails from './MealItemDetails';

class MealItem extends React.Component {
  state = {
    showDetails: false
  }

  showMealItemDetails = () => {
    this.setState({
      showDetails: true
    })
  }

  hideMealItemDetails = () => {
    this.setState({
      showDetails: false
    })
  }

  render() {
    console.log(this.props)
    return (
      <div className="meal-item-container">
        <div className="meal-item" style={{backgroundColor: this.props.color}} onClick={this.showMealItemDetails}>
          <h4 className="meal-item-title">{this.props.meal.title}</h4>
          <p className="meal-item-name">{this.props.meal.mealName}</p>
        </div>
        <MealItemDetails
          show={this.state.showDetails}
          onHide={this.hideMealItemDetails}
          title={this.props.meal.title}
          recipeId={this.props.meal.recipeId}
          docId={this.props.meal.docId}
          removeMealFromState={this.props.removeMealFromState}
          />
      </div>
    )
  }
}

export default MealItem
