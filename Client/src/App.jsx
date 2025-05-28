import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Components/Home/Home';
import Request from './Components/Request/request';
import Navbar from './Components/Navbar/Navbar';
import About from './Components/About/About';
import Profile from './Components/Profile/Profile';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import AdminReq from './Admin/Request/AdminReq';
import Ride from './Admin/Ride/Ride';
import AdminProfile from './Admin/Profile/AdminProfile';
const App = () => {
  return (
    <Router>
      
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/request" element={<Request />} />
        <Route path='/about' element={<About/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/login' element={<Login/>}/>
         <Route path='/signup' element={<Signup/>}/>
          <Route path='/admin/request' element={<AdminReq/>}/>
          <Route path='/admin/profile ' element={<AdminProfile/>}/>
         <Route path='/admin/ride' element={<Ride/>}/>
      </Routes>
    </Router>
  );
};

export default App;
