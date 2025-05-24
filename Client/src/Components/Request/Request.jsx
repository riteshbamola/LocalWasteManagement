import React, { useState } from 'react';
import './request.css';
import Map from '../Maps/Map';

const Request = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    wasteType: '',
    pickupDate: '',
    pickupTime: ''
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
    setFormData({
      name: '',
      address: '',
      wasteType: '',
      pickupDate: '',
      pickupTime: ''
    });
    setLocation(null);
  };

  return (
    <div className='request-container'>
      <div className='map'>
        <h1>Select Your Location</h1>

        <div className='location-buttons'>
          <button onClick={() => setMode('select')}>Select on Map</button>
          <button onClick={handleUseCurrentLocation}>Use Current Location</button>
        </div>

        <Map onLocationSelect={handleLocationSelect} enableClick={mode === 'select'} />

        {location && (
          <div className="location-info">
            <p><strong>Latitude:</strong> {location.lat}</p>
            <p><strong>Longitude:</strong> {location.lng}</p>
            <p><strong>Address:</strong> {location.address}</p>
          </div>
        )}
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

          <label>
            Pickup Date:
            <input
              type="date"
              name="pickupDate"
              value={formData.pickupDate}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Pickup Time:
            <input
              type="time"
              name="pickupTime"
              value={formData.pickupTime}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit" className='submit-btn'>Submit Request</button>
        </form>
      </div>
    </div>
  );
};

export default Request;
