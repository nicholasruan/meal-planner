import React from 'react';
import axios from 'axios';
import RecipeList from './RecipeList';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
// import { Input } from 'antd'
import Form from 'react-bootstrap/Form';

class MealForm extends React.Component {
  state = {
    title: '',
    selectedMeal: null,
    mealName: null
  }

  handleTitleChange = (event) => {
    this.setState({
      title: event.target.value
    })
  }

  handleMealSelect = (recipeId, meal) => {
    this.setState({
      selectedMeal: recipeId,
      mealName: meal
    })
  }

  clearForm = () => {
    this.setState({
      title: '',
      selectedMeal: null,
      mealName: null
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.state.selectedMeal) {
      alert('Please select a meal')
      return
    }
    axios.request({
      method: 'POST',
      url: `https://us-central1-meal-planner-164c3.cloudfunctions.net/app/addMeal`,
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      data: {
        'uid': localStorage.user_id,
        'date': this.props.date,
        'title': this.state.title,
        'recipeId': this.state.selectedMeal,
        'mealName': this.state.mealName,
      },
    })
    .then(response => {
      console.log(response.data)
      this.props.addMealToState(response.data)
      this.props.onHide()
      this.clearForm()
    })
  }

  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered >
        <Modal.Header closeButton className="modal-header-form">
          <Modal.Title className="modal-title">
            Add Meal to Planner
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form style={{ padding: '2%' }} onSubmit={this.handleSubmit} onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}>
            <Form.Group>
              <Form.Label className="form-label">Meal Name</Form.Label>
              <Form.Control className="meal-name-form" value={this.state.title} required type="text" placeholder="Name" onChange={this.handleTitleChange} />
            </Form.Group>
            <Form.Group>
                <RecipeList
                  formMode={true}
                  handleMealSelect={this.handleMealSelect}
                  selectedMeal={this.state.selectedMeal} />
            </Form.Group>
            <div id="wrapper">
              <Button type="primary" htmltype="submit">
                Submit
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    )
  }
}

export default MealForm
