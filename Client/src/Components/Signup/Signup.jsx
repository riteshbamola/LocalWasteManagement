import React from 'react';
import './Signup.css'; // Import the custom CSS file
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../Contexts/globalcontext';
const Signup = () => {

  const {handlesignup}= useGlobalContext();
  const navigate = useNavigate();
  const [formData , setFormData] = React.useState({name:'',email:'',
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
      const response=handlesignup(formData);
      if(response)
      {
        navigate('/login');
      }
      // console.log(response);
      
    }
  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-label">
            Name
            <input type="text" className="login-input" name='name' onChange={handleChange} placeholder="Enter your Name" />
          </label>

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
      </div>
    </div>
  );
};

export default Signup;