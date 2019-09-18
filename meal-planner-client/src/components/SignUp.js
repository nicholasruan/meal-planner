import React from 'react'
import axios from 'axios'
import fire from '../config/fire'
import { Form, Input, Button, Icon } from 'antd'

class SignUp extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    if (this.state.password === this.state.passwordConfirmation) {
      fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(result => {
        axios.post({
          method: 'POST',
          url: `https://us-central1-meal-planner-164c3.cloudfunctions.net/app/addUser`,
          headers: {
            'Content-Type': 'application/json',
            'Accepts': 'application/json'
          },
          data: {
            'uid': localStorage.user_id,
            'email': this.state.email,
            'name': this.state.name
          },
        })
        .then(response => {
          console.log(response.data)
          this.props.addMealToState(response.data)
          this.props.onHide()
        })
        alert('Success!')
        this.props.routerProps.history.push("/login")
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode && errorMessage) {
          alert(errorCode, errorMessage)
        }
      });
    } else {
      alert("Passwords don't match!")
    }

  }

  render() {
    return (
      <div className="signup">
        <h1>Sign Up</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              name="username"
              value={this.state.username}
              placeholder="Username"
              onChange={this.handleChange} />
          </Form.Item>
          <Form.Item>
            <Input
              prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
              name="email"
              value={this.state.email}
              placeholder="Email"
              onChange={this.handleChange} />
          </Form.Item>
          <Form.Item>
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              name="password"
              value={this.state.password}
              placeholder="Password"
              type="password"
              onChange={this.handleChange} />
          </Form.Item>
          <Form.Item>
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              name="passwordConfirmation"
              value={this.state.passwordConfirmation}
              placeholder="Password Confirmation"
              type="password"
              onChange={this.handleChange} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default SignUp
