import React from 'react';
import { Link } from 'react-router-dom';

function PageNotFound(props) {
  return (
    <div className="error-page">
      <h2>
        You Need To Sign In To View This!
      </h2>
      <Link to="/">
        <p className="error-redirect">Click Here To Redirect To Login</p>
      </Link>
      <div className="cat-gif">
        <img src="https://media.giphy.com/media/o0vwzuFwCGAFO/source.gif" alt=""/>
      </div>
      <p>&copy; Meal Mate 2019</p>
    </div>
  )
}

export default PageNotFound
