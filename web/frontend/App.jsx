
// import React, { useState } from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { Navigationbar } from './components/Navigationbar';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { QueryProvider, PolarisProvider } from './components';
// import Products from './pages/Products';
// import HomePage from './pages/index';
// import Shoping from './pages/Shoping';
// import Cart from './pages/Cart';
// import ViewProduct from './pages/ViewProduct';
// import BuyNow from './pages/BuyNow';
// import Profile from './pages/Profile';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import AdminLogin from './pages/AdminLogin';
// import Contact from './pages/Contact';

// export default function App() {
//     const [cartItems, setCartItems] = useState([]);
//     const [loggedIn, setLoggedIn] = useState(false);

//     const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

//     const handleLogin = () => {
//         setLoggedIn(true);
//     };

//     const handleLogout = () => {
//         setLoggedIn(false);
//         setCartItems([]);
//         localStorage.removeItem('userData');
//     };

//     return (
//         <PolarisProvider>
//             {/* Ensure BrowserRouter wraps the entire component structure */}
//             <BrowserRouter>
//                 <QueryProvider>
//                     <div className="main-section">
//                         {loggedIn && (
//                             <div className="menu-section">
//                                 <Navigationbar cartItems={cartItems} onLogout={handleLogout} />
//                             </div>
//                         )}
//                         <div className="content-section">
//                             <Routes>
//                                 <Route path="/Shoping" element={<Shoping setCartItems={setCartItems} cartItems={cartItems} />} />
//                                 <Route path="/" element={<Login onLogin={handleLogin} />} />
//                                 <Route path="/AdminLogin" element={<AdminLogin onLogin={handleLogin} />} />
//                                 <Route path="/Register" element={<Register onLogin={handleLogin} />} />
//                                 <Route path="/Profile" element={<Profile onLogout={handleLogout} />} />
//                                 <Route path="/products" element={<Products />} />
//                                 <Route path="/contact" element={<Contact />} />
//                                 <Route path="/ViewProduct/:productId" element={<ViewProduct setCartItems={setCartItems} cartItems={cartItems} />} />
//                                 <Route path="/Cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
//                                 <Route path="/buy-now" element={<BuyNow amount={totalPrice} />} />
//                                 <Route path="/AddProduct" element={<HomePage />} />
//                             </Routes>
//                         </div>
//                     </div>
//                 </QueryProvider>
//             </BrowserRouter>
//         </PolarisProvider>
//     );
// }






import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigationbar } from './components/Navigationbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { QueryProvider, PolarisProvider } from './components';
import Products from './pages/Products';
import HomePage from './pages/index';
import Shoping from './pages/Shoping';
import Cart from './pages/Cart';
import ViewProduct from './pages/ViewProduct';
import BuyNow from './pages/BuyNow';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminLogin from './pages/AdminLogin';
import Contact from './pages/Contact';

export default function App() {
    const [cartItems, setCartItems] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false); 

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleLogin = () => {
        setLoggedIn(true);
    };

    const handleLogout = () => {
        setLoggedIn(false); // Set loggedIn state to false on logout
        setCartItems([]); // Clear cart items
        localStorage.removeItem('userData'); // Remove user data from localStorage
    };

    return (
        <PolarisProvider>
            <BrowserRouter>
                <QueryProvider>
                    <div className="main-section">
                        {loggedIn && (
                            <div className="menu-section">
                                <Navigationbar cartItems={cartItems} onLogout={handleLogout} />
                            </div>
                        )}
                        <div className="content-section">
                            <Routes>
                                <Route path="/Shoping" element={<Shoping setCartItems={setCartItems} cartItems={cartItems} />} />
                                <Route path="/" element={<Login onLogin={handleLogin} />} />
                                <Route path="/AdminLogin" element={<AdminLogin onLogin={handleLogin} />} />
                                <Route path="/Register" element={<Register onLogin={handleLogin} />} />
                                <Route path="/Profile" element={<Profile onLogout={handleLogout} />} />
                                <Route path="/products" element={<Products />} />
                                <Route path="/contact" element={<Contact />} />
                                <Route path="/ViewProduct/:productId" element={<ViewProduct setCartItems={setCartItems} cartItems={cartItems} />} />
                                <Route path="/Cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
                                <Route path="/buy-now" element={<BuyNow amount={totalPrice} />} />
                                <Route path="/AddProduct" element={<HomePage />} />
                            </Routes>
                        </div>
                    </div>
                </QueryProvider>
            </BrowserRouter>
        </PolarisProvider>
    );
}
