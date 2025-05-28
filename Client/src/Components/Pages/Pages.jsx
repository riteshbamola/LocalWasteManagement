import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../Contexts/globalcontext';
import Home from '../Home/Home';
import Request from '../Request/request';
import Profile from '../Profile/Profile';
import Navbar from '../Navbar/Navbar';
import About from '../About/About';
// import Profile from '../Profile/Profile';
function Pages() {
  const {getAccount,user}= useGlobalContext();
   useEffect(() => {
    getAccount();
     
    return () => { };
  }, [])
 const navigate = useNavigate();
  
  const [active, setActive] = useState(1);
 
  const displayData = () => {
     if (user == null)
      navigate('/login')
     else{

     
    switch (active) {
      case 1:
        return <Home />
      case 2:
        return <Request />
      case 3:
        return <Profile />
      case 4:
        return <About />

      default:
        return <Home />
    }
    }
  }

  return (
        <>
        <Navbar active={active} setActive={setActive} />
        <main>
          {displayData()}
        </main>
        </>
    
  );
}



export default Pages;