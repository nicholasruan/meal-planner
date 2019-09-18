import React from 'react'
import axios from 'axios'
import fire from '../config/fire'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

class Profile extends React.Component {
  state = {
    currentUser: {}
  }

  componentDidMount() {
    axios.request({
      method: 'POST',
      url: 'https://us-central1-meal-planner-164c3.cloudfunctions.net/app/getUser',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      data: {
        'uid': localStorage.user_id,
      },
    })
    .then(response => {
      console.log(response.data)
      this.setState({
        currentUser: response.data
      })
    })
  }

  render() {
    const { imgURL, name, email } = this.state.currentUser
    return (
      <div>
        <Container>
          <Row className="profile-content">
            <Col xs={6} md={4}>
              <Image className="profile-img" src={imgURL} roundedCircle />
              <h2>{name}</h2>
              <h3>{email}</h3>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default Profile
