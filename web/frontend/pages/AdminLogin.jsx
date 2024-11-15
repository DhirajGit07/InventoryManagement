import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Link,useNavigate } from 'react-router-dom';

export default function AdminLogin({onLogin}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = (e) => {
    e.preventDefault();

    const defaultEmail = 'dhiraj@gmail.com';
    const defaultPassword = '123';

    if (email === defaultEmail && password === defaultPassword) {
       // Call onLogin to update login state in App
       onLogin();
      // Show SweetAlert2 popup
      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: 'Welcome, Admin!',
        showConfirmButton: true,
      }).then(() => {
      // Navigate to the AddProduct page after the popup is closed
        navigate('/addproduct');
      });
      setErrorMessage('');
    } else {
      setErrorMessage('Invalid email or password');
    }
  };

  return (
    <div className="Adminlogin-container">
      <div className="Adminlogin-box">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <div className="Admininput-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="Admininput-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {errorMessage && <p className="error">{errorMessage}</p>}

          <button type="submit" className="Adminlogin-btn">
            Login
          </button>
        </form>
        {/* Add paragraph for Admin Login navigation */}
        <p style={{ cursor: 'pointer', color: 'blue', marginTop: '20px',justifyContent:"center" }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'blue' }}>
            Are you an User? Click here to <b> Userlogin.</b>
          </Link>
        </p>
      </div>
    </div>
  );
}

