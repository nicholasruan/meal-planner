import React from 'react'
import axios from 'axios'
import ClipLoader from 'react-spinners/ClipLoader';

class ShoppingList extends React.Component {
  state = {
    loading: true
  }

  componentDidMount() {
    this.setState({
      loading: false
    })
  }

  render() {
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
				<div>
          <h1 className="page-title">Shopping List</h1>
				</div>
      )
    }
  }
}

export default ShoppingList
