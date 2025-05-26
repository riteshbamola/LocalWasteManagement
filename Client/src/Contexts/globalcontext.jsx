import React, { createContext, useContext, useState } from "react";
import axiosInstance from '../utils/axiosInstance';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [requests, setrequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [username,setusername]=useState(null);

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
      setusername(user.name)
      console.log(user);
      setToken(token);
      localStorage.setItem('token', token); // ✅ Use "token"
      // console.log(token);
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
        setUser(response.data);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

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
      username,
      handlesignup,
      handlelogin,
      getAccount,
      addrequest,
      setUser,
      setToken
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
