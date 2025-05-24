import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleRequestPickup = () => {
    navigate('/request');
  };

  return (
    <div className='main'>
      <div className='home-container'>
        <section className='left'>
          <h2>Throw Garbage From Home</h2>
          <p>Schedule pickups, track requests, and keep your locality clean with our smart waste management system.</p>
          <button className='cta-btn' onClick={handleRequestPickup}>
            Request Pickup
          </button>
        </section>
      </div>
    </div>
  );
};

export default Home;
