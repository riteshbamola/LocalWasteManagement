import React from 'react'
import Map from '../Map/Map'
import { useGlobalContext } from '../../Contexts/globalcontext'
import './Ride.css'
import Navbar from '../Navbar/Navbar'

const Ride = () => {
  const { adminRide } = useGlobalContext();

  const mockData = [
    { id: 1, description: "Pickup scheduled for tomorrow", status: "Pending", location: "Badripur" },
    { id: 2, description: "Recycling bin pickup requested", status: "Completed", location: "Dehradun" },
    { id: 3, description: "Complaint about overflow bin", status: "In Progress", location: "Raiwala" }
  ];

  const ride = mockData.find(req => req.id === adminRide);

  const handleReached = () => {
    alert("Marked as Reached!");
    // Logic to update status can be added
  };

  const handleDispose = () => {
    alert("Request disposed!");
    // Logic to remove or update request status can be added
  };

  return (
    <>
    <Navbar/>
   
    <div className='ride-container'>
      <Map />
      {ride && (
        <div className='ride-details'>
          <h2>Ride Details</h2>
          <p><strong>Description:</strong> {ride.description}</p>
          <p><strong>Status:</strong> {ride.status}</p>
          <p><strong>Location:</strong> {ride.location}</p>
          <div className="ride-buttons">
            <button className='reached-btn' onClick={handleReached}>Reached</button>
            <button className='dispose-btn' onClick={handleDispose}>Dispose</button>
          </div>
        </div>
      )}
    </div>
   </>
  );
}

export default Ride;
