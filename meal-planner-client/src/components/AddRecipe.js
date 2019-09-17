import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from	'axios';
import {Icon} from 'antd'

class AddRecipe extends React.Component {
	state = {
		ingredients: [],
		name: '',
		category: '',
		imageUrl: '',
		directions: '',
		imageName: '',
		imageFile: null
	}

	clearForm = () => {
    this.setState({
			ingredients: [],
			name: '',
			category: '',
			imageUrl: '',
			directions: '',
			imageName: '',
			imageFile: null
    })
  }

	handleSubmit = (e) => {
		e.preventDefault();
		console.log('hello')
		const data = new FormData();
		let selectedFile = this.state.imageFile;
			  // If file selected
			    if ( selectedFile ) {
			  data.append( 'profileImage', selectedFile, selectedFile.name );
			  axios.post( 'https://therecipedb.herokuapp.com/api/img-upload', data, {
			      headers: {
			        'key' : 'miloislife',
			       'accept': 'application/json',
			       'Accept-Language': 'en-US,en;q=0.8',
			       'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
			      }
			     })
			      .then( ( response ) => {
			  if ( 200 === response.status ) {
			        // If file size is larger than expected.
			        if( response.data.error ) {
			         if ( 'LIMIT_FILE_SIZE' === response.data.error.code ) {
			          console.log('Max size: 2MB');
			         } else {
			          console.log( response.data );
			         }
			        } else {
			         console.log('fileName', response.data.location );
							 this.setState({
								 imageUrl: response.data.location
							 })
							 let body = {
								 name : this.state.name,
								 category : this.state.category,
								 ingredients : this.state.ingredients,
								 imageurl : this.state.imageUrl,
								 directions : this.state.directions
							 }
							 console.log(body);

							 axios.post('https://therecipedb.herokuapp.com/api/create', body, {
							 	headers: {
							 		'key' : 'miloislife',
							 	}
							 }).then((response) => {
							 	console.log(response);
								alert('meal added successfully')

								this.clearForm();

							 }).catch((error) => {
							 	console.log(error);
							 })

			        }
			       }
			      }).catch( ( error ) => {
			      console.log(error);
			      alert(error);
			     	});
			    } else {
			     console.log('Please upload file');
			    }
	}

	addIngredient = () => {
		this.setState({ingredients: [...this.state.ingredients, ""]})
	}

	handleIngredientChange = (e, index) => {
		this.state.ingredients[index] = e.target.value
		this.setState({ingredients: this.state.ingredients})
	}

	removeIngredient = (index) => {
		this.state.ingredients.splice(index,1)
		this.setState({ingredients: this.state.ingredients})
	}

	onImageChange = (event) => {
		let filename = event.target.value.split("\\");
		this.setState({
			imageName: filename.pop(),
			imageFile: event.target.files[0]
		})
	}

	handleRecipeName = (event) => {
		this.setState({
			name: event.target.value
		})
	}

	handleCategory = (event) => {
		this.setState({
			category: event.target.value
		})
	}

	handleDirections =  (event) => {
		this.setState({
			directions: event.target.value
		})
	}

	render() {
		return(
			<div className="container">
				<h1 className="page-title">Add a Recipe</h1>

				<Form className="recipe-form">
				  <Form.Group>
						<Form.Label className="form-label">Recipe Name	</Form.Label>
						<Form.Control value={this.state.name} required type="text" placeholder="Recipe Name" onChange={(e) => this.handleRecipeName(e)}/>
					</Form.Group>

					<Form.Group>
						<Form.Label className="form-label">Category</Form.Label>
						<Form.Control value={this.state.category} required type="text" placeholder="Category" onChange={(e) => this.handleCategory(e)}/>
					</Form.Group>

					<Form.Group>
						<Form.Label className="form-label">Ingredients</Form.Label>
						{
							this.state.ingredients.map((ingredient, index) => {
								return (
									<div key={index} className="ingredient-list">
									<Form.Control
										required
										type="text"
										value={ingredient}
										onChange={(e) => this.handleIngredientChange(e, index)}
									/>
									<Button className="remove-button" variant="danger" onClick={() => this.removeIngredient(index)}>
										Delete
									</Button>
									</div>
								)
							})
						}
						<Button className="add-button" variant="info" onClick={(e) => this.addIngredient(e)}>
					    Add Ingredient
					  </Button>
					</Form.Group>

					<Form.Group>
					<Form.Label className="form-label">Image</Form.Label>
					<label for="file-upload" class="custom-file-upload">
					<Icon type="cloud-upload" />{' '}Choose a File
					</label><div>{this.state.imageName}</div>
					<input id="file-upload" type="file" onChange={(e) => this.onImageChange(e)}/>
				  </Form.Group>

					<Form.Group>
				    <Form.Label className="form-label">Directions</Form.Label>
				    <Form.Control value={this.state.directions} required as="textarea" rows="6" onChange={(e) => this.handleDirections(e)}/>
				  </Form.Group>
				  <Button variant="primary" type="submit" onClick={(e) => this.handleSubmit(e)}>
				    Submit
				  </Button>
				</Form>
			</div>
		)
	}
}

export default AddRecipe
