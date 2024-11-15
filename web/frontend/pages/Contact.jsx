// import React from 'react';

// export default function Contact() {
//   return (
//     <div className="contact-container">
//       <h1>Contact Us</h1>
//       <p>If you have any questions or concerns, feel free to reach out to our customer support team at <a href="tel:8600770710">123-456-7890</a> or email us at <a href="mailto:Dhiraj2000hatwar@gmail.com">support@example.com</a></p>

//       {/* Contact Form */}
//       <form className="contact-form">
//         <div className="form-group">
//           <label htmlFor="name">Name</label>
//           <input type="text" id="name" placeholder="Your Name" required />
//         </div>
//         <div className="form-group">
//           <label htmlFor="email">Email</label>
//           <input type="email" id="email" placeholder="Your Email" required />
//         </div>
//         <div className="form-group">
//           <label htmlFor="message">Message</label>
//           <textarea id="message" placeholder="Your Message" rows="5" required></textarea>
//         </div>
//         <div className="form-group">
//           <input type="submit" value="Submit" className="submit-btn" />
//         </div>
//       </form>
//     </div>
//   );
// }


import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making API requests

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const sendEmail = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8081/send-email', formData);
      alert('Message sent successfully!');
    } catch (error) {
      alert('Failed to send message, please try again later.');
    }
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>If you have any questions or concerns, feel free to reach out to our customer support team at <a href="tel:1234567890">860-0770-710</a> or email us at <a href="mailto:Dhiraj2000hatwar@gmail.com">Dhiraj2000hatwar@gmail.com</a></p>

      {/* Contact Form */}
      <form className="contact-form" onSubmit={sendEmail}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" placeholder="Your Name" value={formData.name} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Your Email" value={formData.email} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea id="message" placeholder="Your Message" rows="5" value={formData.message} onChange={handleInputChange} required></textarea>
        </div>
        <div className="form-group">
          <input type="submit" value="Submit" className="submit-btn" />
        </div>
      </form>
    </div>
  );
}
