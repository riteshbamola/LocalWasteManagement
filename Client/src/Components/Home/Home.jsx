  import React from 'react';
  import './Home.css'; // Corrected import path
  // import RiteshImg from './'
  import riteshImg from './ritesh.jpg'; 
  const Home = () => {
    return (
      <div className='main'>
        <div className='home-container'>
          <section className='left'>
            <h2>Throw Garbage From Home</h2>
            <p>Schedule pickups, track requests, and keep your locality clean with our smart waste management system.</p>
            <button className='cta-btn'>Request Pickup</button>
          </section>

          <div className='right'>
            <img src={riteshImg} alt="dasd" />
          </div>
        </div>
      </div>
    );
  };

  export default Home;
