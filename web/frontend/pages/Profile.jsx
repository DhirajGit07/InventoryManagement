
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import md5 from 'md5'; // Import md5 for hashing email
// import Swal from 'sweetalert2'; // Import SweetAlert2

// export default function Profile() {
//   const [userData, setUserData] = useState(null); // State to hold user data
//   const navigate = useNavigate();

//   // Fetch the user data from localStorage or session upon component load
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('userData'));
//     if (!user) {
//       navigate('/login'); // Redirect if no user data is found
//     } else {
//       setUserData(user);
//     }
//   }, [navigate]);

//   if (!userData) return <p>Loading...</p>;

//   // Generate Gravatar URL from the email
//   const gravatarUrl = `https://www.gravatar.com/avatar/${md5(userData.email.trim().toLowerCase())}?d=identicon`; // Use "identicon" as a default image if Gravatar not found

//   // Handle logout with confirmation
//   const handleLogout = () => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You will be logged out.",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, logout!'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         localStorage.removeItem('userData'); // Clear user data
//         navigate('/'); // Redirect to home/login page
//         Swal.fire('Logged out', 'You have been successfully logged out.', 'success');
//       }
//     });
//   };

//   return (
//     <div className="profile-container">
//       <div className="profile-card">
//         <h1 className='profile-head' style={{fontSize:'20px'}}>Profile</h1>
//         <hr />
//         <br />
//         <div className="profile-image">
//           <img
//             src={gravatarUrl}
//             alt="User"
//             onError={(e) => {
//               e.target.onerror = null; // Prevents infinite loop if the fallback image fails
//               e.target.src = "https://via.placeholder.com/150"; // Custom fallback image
//             }} 
//           />
//         </div>
//         <h2>{userData.email}</h2>
//         <p className="user-detail"><b>Role:</b> User</p> {/* You can add more user-specific fields */}
//         <p className="user-detail"><b>Joined:</b> {new Date().toLocaleDateString()}</p>
//         <hr />
//         <button className="logout-btn" onClick={handleLogout}>
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// }








import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import md5 from 'md5';
import Swal from 'sweetalert2';

export default function Profile() {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userData'));
        if (!user) {
            navigate('/'); // Redirect to login if user data not found
        } else {
            setUserData(user);
        }
    }, [navigate]);

    if (!userData) return <p>Loading...</p>;

    const gravatarUrl = `https://www.gravatar.com/avatar/${md5(userData.email.trim().toLowerCase())}?d=identicon`;

    const handleLogout = () => {
      Swal.fire({
          title: 'Are you sure?',
          text: 'You will be logged out.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, logout!'
      }).then((result) => {
          if (result.isConfirmed) {
              localStorage.removeItem('userData');
              navigate('/'); // Redirect to login after logout
              Swal.fire('Logged out', 'You have been successfully logged out.', 'success');
          }
      });
  };
  

    return (
        <div className="profile-container">
            <div className="profile-card">
                <h1 className='profile-head' style={{fontSize:'20px'}}>Profile</h1>
                <hr />
                <br />
                <div className="profile-image">
                    <img
                        src={gravatarUrl}
                        alt="User"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/150";
                        }}
                    />
                </div>
                <h2>{userData.email}</h2>
                <p className="user-detail"><b>Role:</b> User</p>
                <p className="user-detail"><b>Joined:</b> {new Date().toLocaleDateString()}</p>
                <hr />
                <button className="logout-btn" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
}
