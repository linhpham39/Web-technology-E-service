import React, { useContext, useState } from 'react';
import "./navbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from '../../../context/AuthContext';

const Navbar = () => {
  const { user, setUser, dispatch } = useContext(AuthContext);
  const [logoutError, setLogoutError] = useState(null);

  const handleLogout = () => {
    setUser(null);
  };

  const handelClick = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className='navbar'>
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className='logo'> LINHBOOKING </span>
        </Link>
        {user ? (
          <div className="navItems">
            <span className="username">{user.username}</span>
            <Link to="/"> <button className="navButton" onClick={handelClick}>Sign out</button></Link>
            {/* <button className="navButton" onClick={handelClick}>Sign Out</button> */}
          </div>
        ) : (
          <div className="navItems">
            <Link to="/login">
            <button className="navButton">Login</button>
            </Link>
            <Link to="/register">
            <button className="navButton">Register</button>
            </Link>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
