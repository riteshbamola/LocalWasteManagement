import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Components/Home/Home';
import Request from './Components/Request/request';
import Navbar from './Components/Navbar/Navbar';
import About from './Components/About/About';
import Profile from './Components/Profile/Profile';

const App = () => {
  return (
    <Router>
      
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/request" element={<Request />} />
        <Route path='/about' element={<About/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </Router>
  );
};

export default App;
