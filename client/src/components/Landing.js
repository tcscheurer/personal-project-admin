import React, {Component} from 'react';
import {HashLink} from 'react-router-hash-link';
import '../styles/Landing.css'
import pic1 from '../styles/images/pexels-photo-428339.jpeg';
import pic2 from '../styles/images/pexels-photo-428341.jpeg';
import pic3 from '../styles/images/pexels-photo-450271.jpeg';

class Landing extends Component{
    render(){
        return(
            <div id="Landing-wrapper">
                <nav id="land-nav-wrapper">
                    <h2 id="land-nav-logo">TRAX</h2>
                    <div id="land-hash-wrapper">
                    <HashLink smooth to="#about-us"><h3 id="land-nav-item">About Us</h3></HashLink>
                    <HashLink smooth to="#customer-reviews"><h3 id="land-nav-item">What Our customers Think</h3></HashLink>
                    </div>
                </nav>
                <div id="landing-content-wrapper">
                    <h1 id="landingLogo">TRAX</h1>
                    <h1 id="land-desc">Manage the logistics of your equipment</h1>
                    <a href='http://localhost:5000/auth'><button className="main-land-btn">SIGN IN/SIGN UP</button></a>
                </div>
                <div id="about-us">
                    <div id="about-us-content">
                        <h1>About</h1>
                        <h3>TRAX is an online application tool to manage the tracking of your equipment and the communtication between you and those who operate your equipment</h3>
                        <h3>Lorem ipsum sdkfjasldkhfasdhgsk sdghosdbnfsdlksndlkgns osjbdfjsbdjbsdngkls osadbskjbdklasd sdjb sdjbfsjdbgs sdjfbsjdbf sdkjbfsjdkbgsjlbdbgls sdjdbkjsdbgs dskjdbfskjdbggsd sdkjbsdhgs sdjbgsjbd</h3>
                    </div>
                </div>
                <div id="customer-reviews">
                    <div id="customer-reviews-content">
                        <div id="customer-content">
                            <img id="formated-review-pic" src={pic1} alt=""/>
                            <h2>Thomas J.</h2>
                            <p><i>"TRAX has been crucial to the success of my business. Would strongly recommend."</i></p>
                        </div>
                        <div id="customer-content">
                            <img id="formated-review-pic" src={pic2} alt=""/>
                            <h2>Nick S.</h2>
                            <p><i>"Wouldn't trust my tracking to anyone else."</i></p>
                        </div>
                        <div id="customer-content">
                            <img id="formated-review-pic" src={pic3} alt=""/>
                            <h2>Ric F.</h2>
                            <p><i>"I love TRAX. 10/10."</i></p>
                        </div>
                    </div>
                </div>
                <a href='http://localhost:5000/auth'><button className="land-get-started">Let's get started</button></a>
            </div>
        )
    }
}

export default Landing;