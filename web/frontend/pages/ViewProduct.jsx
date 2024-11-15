import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const ViewProduct = ({ setCartItems, cartItems }) => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedQuantity, setSelectedQuantity] = useState(1); // State for selected quantity
    const [selectedSize, setSelectedSize] = useState(''); // State for selected size
    const navigate = useNavigate(); // For navigation

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/api/productsss/${productId}`);
                console.log(response.data); // Log the response data for debugging
                setProduct(response.data);

                // Handle size if it's a string, split it into an array
                if (response.data.Size) {
                    const sizeArray = typeof response.data.Size === 'string' 
                        ? response.data.Size.split(',') 
                        : response.data.Size;

                    // Set the first size as default if available
                    if (Array.isArray(sizeArray) && sizeArray.length > 0) {
                        setSelectedSize(sizeArray[0]);
                    }
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (productId) {
            fetchProduct();
        } else {
            setError('Product ID is missing.');
            setLoading(false);
        }
    }, [productId]);

    // const addToCart = () => {
    //     const productToAdd = { ...product, quantity: selectedQuantity, size: selectedSize }; // Only the selected quantity and size
    //     setCartItems([...cartItems, productToAdd]); // Add product to the cart
    //     navigate('/Cart'); // Redirect to Cart page
    // };

    const addToCart = () => {
        const productToAdd = { 
            productId: product ? product.ID : null, 
            quantity: selectedQuantity 
        };
        
        console.log('Adding to cart:', productToAdd); 
    
        if (productToAdd.productId) {
            axios.post('http://localhost:8081/api/update-quantity', productToAdd)
                .then((response) => {
                    console.log('Product quantity updated:', response.data);
                    setCartItems([...cartItems, { ...product, quantity: selectedQuantity, size: selectedSize }]);
                    navigate('/Cart'); 
                })
                .catch((error) => {
                    console.error('Error updating product quantity:', error);
                });
        } else {
            console.error('Product ID is undefined, cannot add to cart.');
        }
    };
    
    
       // Navigate back to the previous page
       const handleGoBack = () => {
        navigate(-1); // Navigates to the previous page
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!product) return <div>No product found.</div>;

    // Prepare size options
    const sizeOptions = typeof product.Size === 'string' ? product.Size.split(',') : product.Size || [];

    return (
        <div className="Veiwproduct-list">
            <div className="Veiwproduct-card">
                  {/* Back Button */}
                  <button onClick={handleGoBack} className="btnBack" style={{ margin: '10px', width:"auto", padding:'2px',height:"30px", border:"none",background:"none" }}>
                  <KeyboardBackspaceIcon />
                    </button>
                <div className="Veiwproduct-image-container">
                    <img
                        className="Veiwproduct-image"
                        src={`http://localhost:8081/uploads/${product.image}`}
                        alt={product.productName}
                    />
                </div>
                <div className="Veiwproduct-details">
                    <h2>{product.productName}</h2>
                    <p>Model: {product.model}</p>
                    <p>Discount: {product.Discount}%</p>
                    <p>Price: ₹{product.price}</p>
                    <p>Quantity Available: {product.quantity}</p>

                    {/* Quantity Selector */}
                    <label htmlFor="quantity">Select Quantity:</label>
                    <input
                        type="number"
                        id="quantity"
                        min="1"
                        max={product.quantity}
                        value={selectedQuantity}
                        onChange={(e) => setSelectedQuantity(Number(e.target.value))}
                    />

                    {/* Size Selector */}
                    {sizeOptions.length > 0 ? (
                        <>
                            <label htmlFor="size">Select Size:</label>
                            <select
                                id="size"
                                value={selectedSize}
                                onChange={(e) => setSelectedSize(e.target.value)}
                            >
                                {sizeOptions.map((size, index) => (
                                    <option key={index} value={size}>
                                        {size}
                                    </option>
                                ))}
                            </select>
                        </>
                    ) : (
                        <p>No size options available</p>
                    )}

                    <p>Description: {product.Descriptions}</p>

                    {/* Add to Cart Button */}
                    <button onClick={addToCart} className="btn btn-primary">
                       <AddShoppingCartIcon /> Add to Cart
                    </button>
                    
                </div>
            </div>
        </div>
    );
};

export default ViewProduct;
