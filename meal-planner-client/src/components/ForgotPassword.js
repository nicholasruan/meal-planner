import React from 'react'
import fire from '../config/fire'
import { Form, Input, Button, Icon } from 'antd'
import { Link } from 'react-router-dom'

class ForgotPassword extends React.Component {
  state = {
    email: '',
  }

	constructor(props) {
     super(props);
     this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
	  event.preventDefault();

		fire.auth().sendPasswordResetEmail(this.state.email)
			.then(result => {
		  alert('email reset sent')
			this.props.history.push("/login")
		}).catch(function(error) {
		  alert(error);
		});

  }

  render() {
    return (
      <div className="login">
        <h1>Forgot Password?</h1>
        <Form id="paddwordForm" onSubmit={this.handleSubmit}>
          <Form.Item>
            <Input
              prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
							required
              name="email"
              value={this.state.email}
              placeholder="Email"
              onChange={this.handleChange} />
          </Form.Item>
					  <Link to="/login" id="forgot-password"><p>Login</p></Link>
          <Form.Item>
            <Button type="primary" form="paddwordForm" key="submit" htmlType="submit">
              Send Password Reset
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default ForgotPassword
