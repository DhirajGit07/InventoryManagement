
// import React, { useState } from 'react';
// import axios from 'axios';


// export default function AdminLogin() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     dob: ''
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:8081/api/register', formData);
//       console.log('User registered:', response.data);
//       alert('User registered successfully!');
//     } catch (error) {
//       console.error('There was an error registering the user!', error);
//       alert('There was an error registering the user. Please try again.');
//     }
//   };

//   return (
//     <div className="Register-page">
//       <div className="left-section">
//         <div className="logo">InVentorY</div>
//         <h2>Create New Account</h2>
//         <p>Already Registered? <a style={{fontSize:"20px"}} href="#login">Login</a></p>
//         <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean semper mauris in magna venenatis suscipit.</p>
//         <button className="learn-more-btn">Learn More</button>
//       </div>
//       <div className="right-section">
//         <form className="Register-form" onSubmit={handleSubmit}>
//           <h1>Register</h1>
//           <label htmlFor="name">Name</label>
//           <input type="text" id="name" value={formData.name} onChange={handleChange} placeholder="Enter your Name" />

//           <label htmlFor="email">Email</label>
//           <input type="email" id="email" value={formData.email} onChange={handleChange} placeholder="Example@gmail.com" />

//           <label htmlFor="password">Password</label>
//           <input type="password" id="password" value={formData.password} onChange={handleChange} placeholder="********" />

//           <label htmlFor="dob">Date of Birth</label>
//           <input type="date" id="dob" value={formData.dob} onChange={handleChange} />

//           <button className="sign-up-btn" type="submit">Sign Up</button>
//         </form>
//       </div>
//     </div>
//   );
// }




import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from React Router

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    dob: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8081/api/register', formData);
      console.log('User registered:', response.data);
      alert('User registered successfully!');
    } catch (error) {
      console.error('There was an error registering the user!', error);
      alert('There was an error registering the user. Please try again.');
    }
  };

  return (
    <div className="Register-page">
      <div className="left-section">
        <div className="logo">InVentorY</div>
        <h2>Create New Account</h2>
        <p>Already Registered? 
          {/* Use Link instead of anchor tag */}
          <Link style={{ fontSize: '20px' }} to="/">Login</Link>
        </p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean semper mauris in magna venenatis suscipit.</p>
        <button className="learn-more-btn">Learn More</button>
      </div>
      <div className="Registerright-section">
        <form className="Register-form" onSubmit={handleSubmit}>
          <h1>Register</h1>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" value={formData.name} onChange={handleChange} placeholder="Enter your Name" />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={formData.email} onChange={handleChange} placeholder="Example@gmail.com" />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={formData.password} onChange={handleChange} placeholder="********" />

          <label htmlFor="dob">Date of Birth</label>
          <input type="date" id="dob" value={formData.dob} onChange={handleChange} />

          <button className="sign-up-btn" type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}