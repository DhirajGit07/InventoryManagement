
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 
import Swal from 'sweetalert2'; 

export default function Login({onLogin}) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:8081/api/login', formData);
      if (response.data.message) {
        localStorage.setItem('userData', JSON.stringify(formData));
   // Call onLogin to update login state in App
   onLogin();
        Swal.fire({
          title: 'Login Successful!',
          text: 'You have successfully logged in. Continue to the Shop page?',
          icon: 'success',
          showCancelButton: true,
          confirmButtonText: 'Continue',
          cancelButtonText: 'Cancel'
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/Shoping');
          }
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        Swal.fire('Error', 'Invalid email or password', 'error');
      } else {
        Swal.fire('Error', 'There was an error logging in. Please try again.', 'error');
      }
    }
  };
  
  return (
    <div className="Login-page">
      <div className="left-section">
        <div className="logo">InVentorY</div>
        <h2>Create New Account</h2>
        <p>Don't have an account? 
          <Link style={{ fontSize: '20px' }} to="/Register"> Register </Link>
        </p>
        <p>If You are Admin Then Click on Admin Login <br /> Here 👇</p>
        <Link to="/AdminLogin">
        <button className="learn-more-btn">Admin Login</button>
        </Link>
      </div>
     
      <img className="illuImage"  src="../assets/illuImage1.png" alt="Bag" />

      <div className="Loginright-section">

        <form className="Login-form" onSubmit={handleSubmit}>
          <h1>User Login</h1>

          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={formData.email} onChange={handleChange} placeholder="Example@gmail.com" />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={formData.password} onChange={handleChange} placeholder="********" />

          <button className="sign-up-btn" type="submit">Login</button>
        </form>
      </div>
     
    </div>
  );
}




