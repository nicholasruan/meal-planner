import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import RecipeDetails from './RecipeDetails';
import axios from 'axios';

function handleDelete(docId){
	axios.request({
		method: 'DELETE',
		url: `https://us-central1-meal-planner-164c3.cloudfunctions.net/app/deleteMeal`,
		data: {
			'uid': localStorage.user_id,
			'docId': docId
		},
	}).then((response) => {

	}).catch((error) => {
		console.log(error);
		alert("unable to delete meal");
	})
}

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
				<p>{props.docId}</p>
					<RecipeDetails
						recipeId={props.recipeId}
						menuItemMode={true}
					/>
				<div className="delete-button">
					<Button className="btn btn-danger" onClick={handleDelete(props.docId)}>Delete</Button>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={props.onHide}>Close</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default MealItemDetails
