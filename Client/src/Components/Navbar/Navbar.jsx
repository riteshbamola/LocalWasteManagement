import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">WasteMgmt</div>

        <ul className="navbar-links">
          <li>
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/request" className={({ isActive }) => (isActive ? 'active' : '')}>
              Request Pickup
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>
              About
            </NavLink>
          </li>
        </ul>

        {/* Profile Section - Avatar + Name Side by Side */}
        <NavLink to="/profile" className="navbar-profile-link">
          <div className="navbar-profile">
            <img
              src="https://i.pravatar.cc/150?img=3 "
              alt="User Avatar"
            />
            <span className="navbar-username">Ritesh</span>
          </div>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;