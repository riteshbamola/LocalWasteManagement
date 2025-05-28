import React, { useState } from 'react';
import './Profile.css';
import Navbar from '../Navbar/Navbar';

import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../Contexts/globalcontext';
const Profile = () => {
 const navigate = useNavigate();

  const{username,signout}= useGlobalContext();
  const [requests, setRequests] = useState(null);
  const [loading, setLoading] = useState(false);

  // Simulated backend response
  const fetchRequests = () => {
    setLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const mockData = [
        { id: 1, description: "Pickup scheduled for tomorrow", status: "Pending" },
        { id: 2, description: "Recycling bin pickup requested", status: "Completed" },
        { id: 3, description: "Complaint about overflow bin", status: "In Progress" }
      ];
      setRequests(mockData);
      setLoading(false);
    }, 800);
  };
  const handleClick =()=>{
    signout();
    navigate('/login');
  }

  return (
    <>
   <Navbar/>
    <div className="profile-container">
      {/* Sidebar */}
      <div className="profile-sidebar">
        <div className="profile-header">
          <img src="https://i.pravatar.cc/150?img=3" alt="User Profile" />
          <h3>{username}</h3>
        </div>

        <button className="request-btn" onClick={fetchRequests}>
          My Requests
        </button>
          <button className="signout-btn" onClick={handleClick}>Sign Out</button>
      </div>

      {/* Main Content Area */}
      <div className="profile-main">

        {loading && <p>Loading requests...</p>}

        {requests && (
          <div className="requests-list-container">
            <h3>Your Requests</h3>
            <ul className="requests-list">
              {requests.map((req) => (
                <li key={req.id} className="request-item">
                  <strong>{req.description}</strong>
                  <span className={`status-tag status-${req.status.toLowerCase()}`}>
                    {req.status}
                  </span>
                </li>
              ))}
            </ul>
          

          </div>
        )}
       
      </div>
      
    </div>
     </>
  );
};

export default Profile;