import React from 'react'
import fire from '../config/fire'
import { Form, Input, Button, Icon } from 'antd'

class Login extends React.Component {
  state = {
    email: '',
    password: ''
  }

  componentDidMount() {

    if (localStorage.user_id) {
      this.props.history.push("/home")
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();

    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(result => {
      localStorage.user_id = result.user.uid
      this.props.history.push("/home")
    })
    .catch(function(error) {

      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode && errorMessage) {
        alert(errorCode, errorMessage);
      }
    });
  }

  render() {
    return (

      <div className="login">
        <h1>Login</h1>
        <Form onSubmit={this.handleSubmit}>
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
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default Login
