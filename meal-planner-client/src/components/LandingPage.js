import React, {useEffect, useRef} from 'react'
import { Link } from 'react-router-dom'
import { TweenMax, Power3 } from 'gsap';
import '../App.css';

const LandingPage = (props) => {
  let titleElement = useRef(null);
  let linksElement = useRef(null);

  useEffect(() => {
    TweenMax.to( titleElement, .8,{ opacity: 1, delay: .8 })
    TweenMax.to( linksElement, .7,{ opacity: 1, delay: 1.5 })
  }, []);


  return (
    <div id="landing-page">
      <h1 id="landing-title" ref={el => {titleElement = el}}>MEAL MATE</h1>

     <div id="link-container" ref={el => {linksElement = el}}>
    <Link to="/login"><h2 id="link-login">Login</h2></Link>
    <Link to="/signup"><h2 id="link-signup">Sign Up</h2></Link>
    </div>

    </div>
  )
}

export default LandingPage
