
import React, { useState , useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { useGlobalContext } from '../../Contexts/globalcontext';
const Navbar = ({active,setActive}) => {
const { user,getAccount } = useGlobalContext();
 useEffect(() => {
    getAccount();
    return () => { };
  }, [])
return (

  <nav className="navbar">
    <div className="navbar-container">
      <div className="navbar-logo">WasteMgmt</div>

      <ul className="navbar-links">
        <li>
          <NavLink end className={({ isActive }) => (isActive ? 'active' : '')} onClick={()=>setActive(1)}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className={({ isActive }) => (isActive ? 'active' : '')} onClick={()=>setActive(2)}>
            Request Pickup
          </NavLink>
        </li>
        <li>
          <NavLink className={({ isActive }) => (isActive ? 'active' : '')} onClick={()=>setActive(4)}>
            About
          </NavLink>
        </li>
      </ul>

      {/* ✅ Safe rendering only when user is available */}
      <NavLink onClick={()=>setActive(3)} className="navbar-profile-link">
        <div className="navbar-profile">
          <img
            src="https://i.pravatar.cc/150?img=3"
            alt="User Avatar"
          />
          <span className="navbar-username">{user._id}</span>
        </div>
      </NavLink>
    </div>
  </nav>
);

};

export default Navbar;