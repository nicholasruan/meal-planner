import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import RecipeDetails from './RecipeDetails';
import axios from 'axios';

class MealItemDetails extends React.Component{
	handleDelete = (docId) => {
		axios.request({
			method: 'DELETE',
			url: `https://us-central1-meal-planner-164c3.cloudfunctions.net/app/deleteMeal`,
			data: {
				'uid': localStorage.user_id,
				'docId': docId
			},
		}).then((response) => {
			console.log('meal deleted');
			this.props.removeMealFromState(docId);
		}).catch((error) => {
			console.log(error);
			alert("unable to delete meal");
		})
	}

	render() {
		return (
			<Modal
				{...this.props}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered >
				<Modal.Header closeButton className="modal-header-details">
				</Modal.Header>
				<Modal.Body className="modal-body-details">
						<RecipeDetails
							recipeId={this.props.recipeId}
							menuItemMode={true}
						/>
					<div className="delete-button">
						<Button id="button-delete" className="btn-danger" onClick={() => this.handleDelete(this.props.docId)}>Delete</Button>
					</div>
				</Modal.Body>
			</Modal>
		)
	}
}

export default MealItemDetails
