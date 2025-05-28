import React, { createContext, useContext, useState } from "react";
import axiosInstance from '../utils/axiosInstance';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [requests, setrequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({});
  const [token, setToken] = useState(null);
  const [adminRide,setAdminRide] = useState([]);
  const [adminUser,setAdminUser] = useState([]);

  const handlesignup = async (data) =>{
    try {
    const response = await axiosInstance.post('/user/register', data);

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }

  }
const handlelogin = async (data) => {
  try {
    const response = await axiosInstance.post('/user/signin', data);

    if (response.data) {
      const { user, accessToken: token } = response.data;
      setUser(user);
      setToken(token);
      localStorage.setItem('token', token); // ✅ Use "token"
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
  const getAccount = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get('/user/profile');
      if (response.data) {
        const {userinfo}= response.data;
        // setUser(userinfo);
        console.log("userdata",response.userinfo);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const signout =()=>{
    localStorage.removeItem('token');
    setUser({});
    setToken(null);
    setusername(null);
  }

  const addrequest = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post('/user/postrequest', data);
      if (response.data) {
        setrequests(prev => [...prev, response.data]);
      }
    } catch (err) {
      console.error("Failed to add request:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlobalContext.Provider value={{
      user,
      requests,
      loading,
      error,
      handlesignup,
      handlelogin,
      getAccount,
      addrequest,
      setUser,
      setToken,
      signout,
      adminRide,
      setAdminRide
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
