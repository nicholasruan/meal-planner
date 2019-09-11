import React, {useEffect, useRef} from 'react'
import { Link } from 'react-router-dom'
import { TweenMax, Power3 } from 'gsap';
import '../App.css';

const LandingPage = (props) => {
  let titleElement = useRef(null);
  let bannerElement = useRef(null);
  let linksElement = useRef(null);

  useEffect(() => {
    console.log(bannerElement.offsetWidth);
    let test = bannerElement.offsetWidth * 500;
    TweenMax.to( titleElement, .8,{ opacity: 1, delay: .8 })
    TweenMax.to( bannerElement, .6,{ width: test, delay: 1.1, ease:Power3.easeInOut})
    TweenMax.to( linksElement, .7,{ opacity: 1, delay: 2.0 })
  }, []);


  return (
    <div id="landing-page">
      <h1 id="landing-title" ref={el => {titleElement = el}}>MEAL MATE</h1>
      <div id="link-container" ref={el => {linksElement = el}}>
      <Link to="/login"><h2 id="link-login">Login</h2></Link>
      <Link to="/signup"><h2 id="link-signup">Sign Up</h2></Link>
      </div>
      <div id="landing-banner" ref={el => {bannerElement = el}}></div>
    </div>
  )
}

export default LandingPage
