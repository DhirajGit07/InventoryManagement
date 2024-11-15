import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Swal from 'sweetalert2'; 

const Shoping = ({ setCartItems, cartItems }) => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get('http://localhost:8081/api/products')
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });
    }, []);

    // Function to navigate to product view without adding to cart
    const handleVeiwProduct = (product) => {
        navigate(`/ViewProduct/${product.ID}`);  
    };

    // Function to add product to cart with SweetAlert notification
    const handleAddToCart = (product) => {
        const existingItem = cartItems.find(item => item.ID === product.ID);
        
        if (existingItem) {
            existingItem.quantity += 1;
            setCartItems([...cartItems]); // Update quantity if product exists
        } else {
            setCartItems([...cartItems, { ...product, quantity: 1 }]); // Add new product to cart
        }

        // Show SweetAlert notification
        Swal.fire({
            title: 'Added to Cart',
            text: `${product.productName} has been added to your cart!`,
            icon: 'success',
            confirmButtonText: 'OK'
        });
    };

    return (
        <>
            <div className="hero-section">
                <img
                    src="../assets/Hero.png"
                    alt="Hero"
                    className="hero-image"
                />
                {/* <button className="shop-now-button" onClick={() => navigate('/Shoping')}>Buy Now</button> */}
            </div>
            <h1 className='Shoping-Heading'>All Products</h1>
            <div className="Shoping-card-container">
                {products.map((product) => (
                    <div className="Shoping-card" key={product.ID}>
                        <img
                            src={product.image ? `http://localhost:8081/uploads/${product.image}` : 'placeholder.jpg'}
                            alt={product.productName || 'No Product Name'}
                            className="Shoping-image"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'placeholder.jpg';
                            }}
                        />
                        <div className="Shoping-details">
                            <h2>{product.productName || 'No Product Name'}</h2>
                            <p>{product.model || 'No Model'}</p>
                            <div className="Shoping-pricing">
                                <span className="price">₹{product.price || 'N/A'}</span>
                                <span className="quantity">Quantity: {product.quantity || 'N/A'}</span>
                            </div>
                            <p>FREE Delivery by <span className='free-p'>InVentorY</span></p>
                            
                            {/* Button to view product without adding to cart */}
                            <button className="ShopingCart-button" onClick={() => handleVeiwProduct(product)}>
                                <RemoveRedEyeIcon /> View Product
                            </button>

                             {/* Separate button for adding to cart  */}
                            <button className="add-to-cart-button" onClick={() => handleAddToCart(product)}>
                               <AddShoppingCartIcon /> Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Shoping;
