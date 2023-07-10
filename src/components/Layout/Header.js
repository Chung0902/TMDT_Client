import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { FaCartPlus, FaFacebook, FaInstagram, FaTwitterSquare, FaPhoneAlt, FaBattleNet, FaHeart, FaUserAlt } from "react-icons/fa";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();

  const handleLogout = () => {
    setAuth({
      ...auth, user:null,token:''
    })
    localStorage.removeItem('auth')
  }
  
  return (
    <>
    <div className="d-flex nav_1">
      <div className="header-top-left xs-hidden">FREE RETURNS. STANDARD SHIPPING ORDERS $99+</div>
      <div className="d-flex">
        <div className="social-icons"><FaFacebook/></div>
        <div className="social-icons"><FaInstagram/></div>
        <div className="social-icons"><FaTwitterSquare/></div>
      </div>
    </div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary_1">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand">
              <FaBattleNet/> Chung_Cosmetic
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <SearchInput/>
            </ul>
             <div class="d-flex">
                  <div className="icon_1"><FaPhoneAlt/></div>
                  <div className="text_1">
                    <h7>CALL US NOW</h7>
                    <h5>+123 5678 890</h5>
                  </div>
              </div>
              <div className="d-flex cart">
              <div className="icon_3"><FaUserAlt/></div>
                <div className="icon_3"><FaHeart/></div>
                <li className="nav-item cart_1">
                  <Badge count={cart?.length} showZero>
                    <NavLink to="/cart" className="nav-link">
                      <div className="cart"><FaCartPlus/></div>
                    </NavLink>
                  </Badge>
                </li>
              </div>
          </div>
        </div>
      </nav>
      <div className="nav_22">
        <ul className="d-flex nav_2">
              <li className="nav-item text_2">
                <NavLink to="/" className="nav-link ">
                  Home
                </NavLink>
              </li>
              <li className="nav-item_ dropdown text_2">
                <Link 
                  className="nav-link dropdown-toggle" 
                  to={"/categories"} 
                  role="button" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item"  to={"/categories"}>
                      All Categories
                    </Link>
                  </li>
                {categories?.map((c) => (
                    <li>
                      <Link 
                        className="dropdown-item" 
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                ))}
                 </ul>
              </li>
              
               {
                !auth.user ? (<>
               <li className="nav-item text_2">
                  <NavLink to="/register" className="nav-link">
                  Register
                  </NavLink>
                </li>
                <li className="nav-item text_2">
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>
              </li>
                </>) : (<>

                  <li className="nav-item dropdown text_2">
                    <NavLink 
                      className="nav-link dropdown-toggle" 
                      href="#" 
                      role="button" 
                      data-bs-toggle="dropdown" 
                      aria-expanded="false">

                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink 
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`} 
                          className="dropdown-item">
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink onClick={handleLogout} to="/login" className="dropdown-item">
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>)
              }
            </ul>
        </div>
    </>
  );
};

export default Header;
