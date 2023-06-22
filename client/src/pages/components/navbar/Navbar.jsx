import React, { useContext } from 'react'
import "./navbar.css"

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className='navbar'>
      <div className="navContainer">
        <span className="logo">LINKBOOKING</span>
        <div className="navItems">
          <button className="navButton">Register</button>
          <button className="navButton">Login</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar