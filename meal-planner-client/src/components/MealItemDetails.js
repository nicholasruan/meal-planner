import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import RecipeDetails from './RecipeDetails';

function MealItemDetails(props) {
	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered >
			<Modal.Header closeButton>
			</Modal.Header>
			<Modal.Body>
				<RecipeDetails
					recipeId={props.recipeId}
					menuItemMode={true}
				/>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={props.onHide}>Close</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default MealItemDetails
