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
    console.log(this.props.meal)
    return (
      <div className="meal-item-container">
        <div className="meal-item" style={{backgroundColor: this.props.color}} onClick={this.showMealItemDetails}>
          {this.props.meal.title}
        </div>
        <MealItemDetails
          show={this.state.showDetails}
          onHide={this.hideMealItemDetails}
          title={this.props.meal.title}
          recipeId={this.props.meal.recipeId}
          />
      </div>
    )
  }
}

export default MealItem
