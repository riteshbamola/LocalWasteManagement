import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { useGlobalContext } from '../../Contexts/globalcontext';
const Navbar = () => {
  const { username } = useGlobalContext();
console.log(username); // For debugging

return (
  <nav className="navbar">
    <div className="navbar-container">
      <div className="navbar-logo">WasteMgmt</div>

      <ul className="navbar-links">
        <li>
          <NavLink to="/admin" end className={({ isActive }) => (isActive ? 'active' : '')}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/request" className={({ isActive }) => (isActive ? 'active' : '')}>
            Requests
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/ride" className={({ isActive }) => (isActive ? 'active' : '')}>
            Ride
          </NavLink>
        </li>
        
      </ul>

      {/* ✅ Safe rendering only when user is available */}
      <NavLink to="/admin/profile" className="navbar-profile-link">
        <div className="navbar-profile">
          <img
            src="https://i.pravatar.cc/150?img=3"
            alt="User Avatar"
          />
          <span className="navbar-username">{username}</span>
        </div>
      </NavLink>
    </div>
  </nav>
);

};

export default Navbar;