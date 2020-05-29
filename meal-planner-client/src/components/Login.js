import React from 'react'
import fire from '../config/fire'
import { Form, Input, Button, Icon } from 'antd'
import { Link } from 'react-router-dom';

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
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode && errorMessage) {
        alert(errorMessage);
      }
    });
  }

  render() {
    return (
      <div className="login">
        <div className="login-container">
          <div className="login-left">
            <h2>Meal Mate</h2>
            <p>Great seeing you back! Happy cooking <span role="img" aria-label="Smile">😊</span></p>
          </div>
          <div className="login-right">
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
              <Form.Item style={{marginBottom: '15px'}}>
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  name="password"
                  value={this.state.password}
                  placeholder="Password"
                  type="password"
                  onChange={this.handleChange} />
              </Form.Item>
              <Link to="/forgotpassword" id="forgot-password"><p >Forgot Password?</p></Link>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
            Need an account?
            <Link to="/signup"><p className="login-signup-link">Sign Up</p></Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
