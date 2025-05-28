import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import Home from './Components/Home/Home';
// import Request from './Components/Request/request';
// import Navbar from './Components/Navbar/Navbar';
// import About from './Components/About/About';
// import Profile from './Components/Profile/Profile';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
// import AdminReq from './Admin/Request/AdminReq';
// import Ride from './Admin/Ride/Ride';
// import AdminProfile from './Admin/Profile/AdminProfile';
import Pages from './Components/Pages/Pages';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pages />} />
        <Route path='/login' element={<Login/>}/>
         <Route path='/signup' element={<Signup/>}/>
        
      </Routes>
    </Router>
  );
};

export default App;
