// import React, { useState } from 'react';
// import { Link } from "react-router-dom";
// import { Navbar, Nav } from 'react-bootstrap';

// export function Navigationbar({ cartItems }) {
//   const [expanded, setExpanded] = useState(false); 

//   // Function to handle link clicks
//   const handleNavLinkClick = () => {
//     setExpanded(false); 
//   };

//   // Calculate total number of items in the cart
//   const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);

//   return (
//     <>
//       <Navbar expand="lg" className="custom-navbar" expanded={expanded} fixed="top">
//         <Navbar.Brand as={Link} to="/Shoping">InVentorY</Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(expanded ? false : true)} />
//         <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
//           <Nav className="mr-auto">
//             <Nav.Link as={Link} to="/cart" onClick={handleNavLinkClick}>
//               Cart {totalItemsInCart > 0 && `(${totalItemsInCart})`} {/* Show cart count */}
//             </Nav.Link>
//             <Nav.Link as={Link} to="/contact" onClick={handleNavLinkClick}>Contact</Nav.Link>
//             {/* <Nav.Link as={Link} to="/" onClick={handleNavLinkClick}>Login</Nav.Link> */}
//             <Nav.Link as={Link} to="/Profile" onClick={handleNavLinkClick}>Profile</Nav.Link>

            
//             <Nav.Link as={Link} to="/products" onClick={handleNavLinkClick}>Products</Nav.Link>
//             <Nav.Link as={Link} to="/AddProduct" onClick={handleNavLinkClick}>AddProduct</Nav.Link>
//           </Nav>
//         </Navbar.Collapse>
//       </Navbar>
//     </>
//   );
// }





import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap';

export function Navigationbar({ cartItems }) {
  const [expanded, setExpanded] = useState(false); 
  const location = useLocation();  // Use useLocation hook to get current route

  // Function to handle link clicks
  const handleNavLinkClick = () => {
    setExpanded(false); 
  };

  // Calculate total number of items in the cart
  const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Conditionally render the navbar based on the current route
  if (location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/AdminLogin') {
    return null;  // Do not render the navbar on login or register pages
  }

  return (
    <Navbar expand="lg" className="custom-navbar" expanded={expanded} fixed="top">
      <Navbar.Brand as={Link} to="/Shoping">InVentorY</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(expanded ? false : true)} />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/cart" onClick={handleNavLinkClick}>
            Cart {totalItemsInCart > 0 && `(${totalItemsInCart})`} {/* Show cart count */}
          </Nav.Link>
          <Nav.Link as={Link} to="/contact" onClick={handleNavLinkClick}>Contact</Nav.Link>
          <Nav.Link as={Link} to="/Profile" onClick={handleNavLinkClick}>Profile</Nav.Link>
          <Nav.Link as={Link} to="/products" onClick={handleNavLinkClick}>Products</Nav.Link>
          <Nav.Link as={Link} to="/AddProduct" onClick={handleNavLinkClick}>AddProduct</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
