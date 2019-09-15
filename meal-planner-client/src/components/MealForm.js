import React from 'react';
import RecipeList from './RecipeList';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Form, Input } from 'antd'

class MealForm extends React.Component {
  state = {
    title: '',
    selectedMeal: null
  }

  handleTitleChange = (event) => {
    this.setState({
      title: event.target.value
    })
  }

  handleMealSelect = (recipeId) => {
    this.setState({
      selectedMeal: recipeId
    })
  }

  clearForm = () => {
    this.setState({
      title: '',
      selectedMeal: null
    })
  }

  render() {
    console.log(this.state.selectedMeal)
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
          <Form style={{ padding: '2%' }}>
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
              <Button type="primary" htmlType="submit">
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
