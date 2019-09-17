import React from 'react';
import axios from 'axios';
import RecipeList from './RecipeList';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Form, Input } from 'antd'

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
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add A Meal
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form style={{ padding: '2%' }} onSubmit={this.handleSubmit}>
            <Form.Item label="Title">
              <Input
                type="text"
                placeholder="Title"
                value={this.state.title}
                onChange={this.handleTitleChange} />
            </Form.Item>
            <Form.Item label="Meal">
              <RecipeList
                formMode={true}
                handleMealSelect={this.handleMealSelect}
                selectedMeal={this.state.selectedMeal} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmltype="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => {this.props.onHide(); this.clearForm();}}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default MealForm
