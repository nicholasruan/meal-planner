import React from 'react'
import axios from 'axios'
import fire from '../config/fire'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import ClipLoader from 'react-spinners/ClipLoader';

class Profile extends React.Component {
  state = {
    currentUser: {},
    loading: true
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
        currentUser: response.data,
        loading: false
      })
    })
  }

  render() {
    const { imgURL, name, email } = this.state.currentUser
    if (this.state.loading) {
      return(
        <div style={{marginTop: '80px'}}>
        <ClipLoader
          sizeUnit={"px"}
          size={120}
          color={'#082D0F'}
        />
      </div>
      )
    } else {
      return (
        <div className="profile-content">
          <Image className="profile-img" src={imgURL} roundedCircle />
          <div className="profile-info">
            <h2>{name}</h2>
            <h3>{email}</h3>
          </div>
        </div>
      )
    }
  }
}

export default Profile
