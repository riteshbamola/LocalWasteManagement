import React, { useState } from 'react';
import './request.css';
import Map from '../Maps/Map';

const Request = () => {

const getCurrentDateTime = () => {
  const now = new Date();
  const date = now.toISOString().split('T')[0]; // YYYY-MM-DD
  const time = now.toTimeString().split(':').slice(0, 2).join(':'); // HH:MM
  return { date, time };
};

const { date, time } = getCurrentDateTime();

const [formData, setFormData] = useState({
  name: '',
  address: '',
  wasteType: '',
  pickupDate: date,
  pickupTime: time
});

  const [location, setLocation] = useState(null);
  const [mode, setMode] = useState('select'); // 'select' or 'current'

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleLocationSelect = (loc) => {
    setLocation(loc);
    setFormData(prev => ({
      ...prev,
      address: loc.address || prev.address
    }));
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
            .then(res => res.json())
            .then(data => {
              handleLocationSelect({
                lat: latitude,
                lng: longitude,
                address: data.display_name
              });
            })
            .catch(() => {
              handleLocationSelect({
                lat: latitude,
                lng: longitude,
                address: 'Unable to fetch address'
              });
            });
        },
        (error) => {
          alert('Location access denied or unavailable');
          console.error(error);
        }
      );
    } else {
      alert('Geolocation is not supported by your browser');
    }
  };
const handleSubmit = (e) => {
  e.preventDefault();
  const requestData = { ...formData, location };
  console.log('Pickup Request:', requestData);
  alert('Pickup request submitted!');

  const { date, time } = getCurrentDateTime(); // get fresh values

  setFormData({
    name: '',
    address: '',
    wasteType: '',
    pickupDate: date,
    pickupTime: time
  });
  setLocation(null);
};
const [currentTime, setCurrentTime] = useState({ date, time });
  return (
    <div className='request-container'>
      <div className='map'>
        <h1>Select Your Location</h1>

        <div className='location-buttons'>
          <button onClick={() => setMode('select')}>Select on Map</button>
          <button onClick={handleUseCurrentLocation}>Use Current Location</button>
        </div>

        <Map onLocationSelect={handleLocationSelect} enableClick={mode === 'select'} />

        
      </div>

      <div className='pickup-form'>
        <h1>Request Pickup</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your full name"
            />
          </label>

          <label>
            Address:
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              readOnly
              placeholder="Pickup address"
            />
          </label>

          <label>
            Waste Type:
            <select
              name="wasteType"
              value={formData.wasteType}
              onChange={handleChange}
              required
            >
              <option value="">Select type</option>
              <option value="organic">Organic</option>
              <option value="recyclable">Recyclable</option>
              <option value="hazardous">Hazardous</option>
              <option value="electronic">Electronic</option>
            </select>
          </label>         
          <button type="submit" className='submit-btn'>Submit Request</button>
        </form>
      </div>
    </div>
  );
};

export default Request;