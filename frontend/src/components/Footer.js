
import React from 'react';
import FooterCss from './CssFolder/Footer.module.css'; // Import the CSS file for styling
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <div className={FooterCss.footer}>
    <div className={FooterCss.row}>
      <ul>
        <li><a className={FooterCss.a} href="#"><span className={FooterCss.icon}><FaFacebook/></span></a></li>
        <li>   <a className={FooterCss.a} href="#"><span className={FooterCss.icon}><FaInstagram/></span></a></li>
      <li><a className={FooterCss.a} href="#"><span className={FooterCss.icon}><FaYoutube/></span></a></li>
      <li><a className={FooterCss.a} href="#"><span className={FooterCss.icon}><FaTwitter /></span></a></li>
      </ul>
      
   
      
      
   </div>

        <div className={FooterCss.row}>
          <ul>
            <li><a className={FooterCss.a} href="#">Contact us</a></li>
            <li><a className={FooterCss.a} href="#">Our Services</a></li>
            <li><a className={FooterCss.a} href="#">Privacy Policy</a></li>
            <li><a className={FooterCss.a} href="#">Terms & Conditions</a></li>
            <li><a className={FooterCss.a} href="#">Career</a></li>
          </ul>
        </div>

        <div className={FooterCss.row}>
          FoodHUNT Copyright © 2024 FoodHUNT - All rights reserved 
        </div>
      </div>
    </footer>
  );
};

export default Footer;