import React from 'react';
import './Login.css'; // Import the custom CSS file
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../Contexts/globalcontext';
const Login = () => {

  const {handlelogin}= useGlobalContext();
  const navigate = useNavigate();
  const [formData , setFormData] = React.useState({email:'',
    password:''});
    
 const handleChange = (e) => {
  setFormData((prev) => ({
    ...prev,
    [e.target.name]: e.target.value
  }));
};
  const handleSubmit = (e) =>
    {
      e.preventDefault();
      console.log(formData);
      const response=handlelogin(formData);
      if(response)
      {
        navigate('/');
      }
      
    }
  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-label">
            Email or Username
            <input type="text" className="login-input" name='email' onChange={handleChange} placeholder="Enter your email or username" />
          </label>
          <label className="login-label">
            Password
            <input type="password" className="login-input" name='password' onChange={handleChange} placeholder="Enter your password" />
          </label>
          <button type="submit" className="login-button">Login</button>
        </form>
        <p className="login-footer">
          Don't have an account? <a href="/register" className="login-link">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;