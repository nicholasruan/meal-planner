import React from 'react'
import fire from '../config/fire'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

class Profile extends React.Component {
  state = {
    currentUser: null
  }

  componentDidMount() {
    this.setState({
      currentUser: fire.auth().currentUser
    })
  }

  render() {
    console.log(this.state.currentUser)
    return (
      <div>
        <Container>
          <Row>
            <Col xs={6} md={4}>
              <Image src="" roundedCircle />
            </Col>
          </Row>
        </Container>
        Profile
      </div>
    )
  }
}

export default Profile
