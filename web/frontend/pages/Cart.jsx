import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Cart({ cartItems, setCartItems }) {
    const navigate = useNavigate(); // Initialize the useNavigate hook

    // Calculate the total price of items in the cart
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    // Function to increase the quantity of an item
    const handleIncrease = (item) => {
        const updatedItems = cartItems.map(cartItem =>
            cartItem.ID === item.ID
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
        setCartItems(updatedItems); // Sync state with parent component
    };

    // Function to decrease the quantity of an item
    const handleDecrease = (item) => {
        const updatedItems = cartItems.map(cartItem =>
            cartItem.ID === item.ID && cartItem.quantity > 1
                ? { ...cartItem, quantity: cartItem.quantity - 1 }
                : cartItem
        );
        setCartItems(updatedItems); // Sync state with parent component
    };

    // Function to remove an item from the cart
    const handleRemove = (item) => {
        const updatedItems = cartItems.filter(cartItem => cartItem.ID !== item.ID);
        setCartItems(updatedItems); // Sync state with parent component
    };

    // Function to handle the buy action and navigate to BuyNow with cart data
    const handleBuy = () => {
        navigate('/buy-now', { state: { cartItems, totalPrice } }); // Pass cartItems and totalPrice via state
    };

    return (
        <div className="cart-container">
            <h1 className='Cart-Heading'>Your Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <p className='cartEmpty'>Your shopping cart is empty.</p>
            ) : (
                <div className="cart-items">
                    {cartItems.map((item) => (
                        <div className="cart-item" key={item.ID}>
                            <img
                                src={item.image ? `http://localhost:8081/uploads/${item.image}` : 'placeholder.jpg'}
                                alt={item.productName || 'No Product Name'}
                                className="cart-item-image"
                            />
                            <div className="cart-item-details">
                                <h2 className='cart-itemH2'>{item.productName || 'No Product Name'}</h2>
                                <p>Model: {item.model || 'No Model'}</p>
                                <p>Price: ₹{item.price || 'N/A'}</p>
                                <p>Size: {item.size || 'N/A'}</p>
                                <p>Quantity:</p>
                                <div className="quantity-control">
                                    <button onClick={() => handleDecrease(item)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => handleIncrease(item)}>+</button>
                                </div>
                                <button className="remove-button" onClick={() => handleRemove(item)}>
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="cart-total">
                        <h2>Total Price: ₹{totalPrice}</h2>
                        <button className="buy-button" onClick={handleBuy}>Buy Now</button>
                    </div>
                </div>
            )}
        </div>
        
    );
}
