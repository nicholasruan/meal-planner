import React from 'react'
import Card from 'react-bootstrap/Card'

class RecipeCard extends React.Component {
	render() {
		return (
			<div>
			<Card>
		    <Card.Img variant="top" className="food-image" src={this.props.imageurl} />
		    <Card.Body>
		      <Card.Text className="card-text">
		        {this.props.name}
		      </Card.Text>
		    </Card.Body>
		  </Card>
			</div>
		)
	}
}

export default RecipeCard
