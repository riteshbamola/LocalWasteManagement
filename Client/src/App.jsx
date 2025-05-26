import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Components/Home/Home';
import Request from './Components/Request/request';
import Navbar from './Components/Navbar/Navbar';
import About from './Components/About/About';
import Profile from './Components/Profile/Profile';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
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
      </Routes>
    </Router>
  );
};

export default App;
