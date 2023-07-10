import React from "react";
import { Link } from "react-router-dom";
import { FaBattleNet } from "react-icons/fa";
const Footer = () => {
  return (
    <div className="footer">
      {/* <h1 className="text-center">All Right Reserved &copy; Techinfoyt</h1>
      <p className="text-center mt-3">
        <Link to="/about">About</Link>|<Link to="/contact">Contact</Link>|
        <Link to="/policy">Privacy Policy</Link>
      </p> */}
      <footer>
        <div className="container">
            <div className="footer-row d-flex md-flex-wrap">
                <div className="footer-col">
                    <h4 className="widget-title">About Us</h4>
                    <div>
                      <Link to="/" className="navbar-brand">
                        <FaBattleNet/> Chung_Cosmetic
                      </Link>
                    </div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec vestibulum magna, et dapibus lacus. Duis nec vestibulum magna, et dapibus lacus.</p>
                </div>
                <div className="footer-col">
                    <h4 className="widget-title">Contact Info</h4>
                    <ul className="contact-info">
                        <li>
                            <span className="contact-info-label">Address:</span>123 Street Name, City, England
                        </li>
                        <li>
                            <span className="contact-info-label">Phone:</span><a href="tel:">(123) 456-7890</a>
                        </li>
                        <li>
                            <span className="contact-info-label">Email:</span> <a href="mailto:mail@example.com">mail@example.com</a>
                        </li>
                        <li>
                            <span className="contact-info-label">Working Days/Hours:</span> Mon - Sun / 9:00 AM - 8:00 PM
                        </li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4 className="widget-title">Customer Service</h4>
                    <ul className="links">
                        <li><a href="#">Help &amp; FAQs</a></li>
                        <li><a href="#">Order Tracking</a></li>
                        <li><a href="#">Shipping &amp; Delivery</a></li>
                        <li><a href="#">Orders History</a></li>
                        <li><a href="#">Advanced Search</a></li>
                        <li><a href="dashboard.html">My Account</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="demo1-about.html">About Us</a></li>
                        <li><a href="#">Corporate Sales</a></li>
                        <li><a href="#">Privacy</a></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4 className="widget-title">Poppular Tags</h4>
                    <div className="tagcloud">
                        <a href="#">Bag</a>
                        <a href="#">Black</a>
                        <a href="#">Blue</a>
                        <a href="#">Clothes</a>
                        <a href="#">Fashion</a>
                        <a href="#">Hub</a>
                        <a href="#">Jean</a>
                        <a href="#">Shirt</a>
                        <a href="#">Skirt</a>
                        <a href="#">Sports</a>
                        <a href="#">Sweater</a>
                        <a href="#">Winter</a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="copyright">
                    © Chung cosmetic. 2023. All Rights Reserved
                </div>
            </div>
        </div>
        
    </footer>
    </div>
  );
};

export default Footer;
