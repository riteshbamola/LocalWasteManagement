import React, { createContext, useContext, useState } from "react";
import axiosInstance from '../utils/axiosInstance';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [requests, setrequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

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
