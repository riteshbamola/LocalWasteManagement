import React, { useState, useEffect } from 'react'
import Map from '../Map/Map'
import { useGlobalContext } from '../../Contexts/globalcontext'
import './Request.css'
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
const AdminReq = () => {
    const navigate= useNavigate();
    const {adminRide,
      setAdminRide}= useGlobalContext();
    const [requests,setRequests]= useState([]);
     useEffect(() => {
    const mockData = [
      { id: 1, description: "Pickup scheduled for tomorrow", status: "Pending", location:"Badripur" },
      { id: 2, description: "Recycling bin pickup requested", status: "Completed", location:"Dehradun" },
      { id: 3, description: "Complaint about overflow bin", status: "In Progress",location:"Raiwala" }
    ];
    setRequests(mockData);
  }, []); //
      // setLoading(false);

  const handleClick =async (id)=>{
    setAdminRide(id);
    navigate('/admin/ride')
  }
  return (
    <>
    <Navbar/>
    <div className='main'>
  
      <div className='req-section'>

      {requests &&  ( <div className="requests-list-container">
            <h3>Your Requests</h3>
            <ul className="requests-list">
              {requests.map((req) => (
                <li key={req.id} className="request-item">
                  <strong>{req.description}</strong>
                  <span >
                    {req.location}
                  </span>
                    <button className="accept-btn" onClick={() => handleClick(req.id)}>Accept</button>
               </li>
              ))}
            </ul>
          

          </div> )}


      </div>
    </div>
  </>
  )
}

export default AdminReq
