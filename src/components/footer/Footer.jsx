import React from "react";
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedin,
} from "react-icons/fa";

import ContentWrapper from "../contentWrapper/ContentWrapper";

import "./style.css";

const Footer = () => {
    return (
      <footer className='footer'>
        <ContentWrapper>
          <ul className='menuItems'>
            <li className='menuItem'>Terms Of Use</li>
            <li className='menuItem'>Privacy-Policy</li>
            <li className='menuItem'>About</li>
            <li className='menuItem'>Blog</li>
            <li className='menuItem'>FAQ</li>
          </ul>
          <div className='infoText'>
            Thank you for exploring our comprehensive collection of movies and
            TV shows. We are dedicated to providing you with an immersive
            entertainment experience, offering a diverse range of content to
            suit every taste. Our platform is designed to keep you informed
            about the latest releases, timeless classics, and trending shows,
            ensuring that you stay connected to the world of entertainment. Sit
            back, relax, and let our curated selection of movies and TV shows
            transport you to new and exciting realms. Your satisfaction is our
            priority, and we are committed to delivering an unparalleled viewing
            experience. Enjoy the magic of cinema and television with us!
          </div>
          <div className='socialIcons'>
            <span className='icon'>
              <FaFacebookF />
            </span>
            <span className='icon'>
              <FaInstagram />
            </span>
            <span className='icon'>
              <FaTwitter />
            </span>
            <span className='icon'>
              <FaLinkedin />
            </span>
          </div>
        </ContentWrapper>
      </footer>
    );
};

export default Footer;
