import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Confetti from 'react-confetti';
import Swal from 'sweetalert2';

const BuyNow = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [showConfetti, setShowConfetti] = useState(false);
    const location = useLocation();
    const { cartItems, totalPrice } = location.state || { cartItems: [], totalPrice: 0 };

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://www.paypal.com/sdk/js?client-id=AX3U45UkYCKAMM5SvGoxJyBDw68dZrkIKQG1C4n5-wjMr4W8Z1w8QFGpBOgDA8IJedDmVbxZfQWowOqn";
        script.addEventListener('load', () => {
            window.paypal.Buttons({
                createOrder: (data, actions) => {
                    return actions.order.create({
                        purchase_units: [{
                            amount: { value: totalPrice.toFixed(2) }
                        }]
                    });
                },
                onApprove: (data, actions) => {
                    return actions.order.capture().then(details => {
                        handlePaymentSuccess(details);
                    });
                },
                onError: (err) => {
                    console.error('PayPal error:', err);
                    setErrorMessage('Payment failed. Please try again.');
                }
            }).render('#paypal-button-container');
        });
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [totalPrice]);

    const handlePaymentSuccess = (details) => {
        const orderId = details.id;
        const payerId = details.payer.payer_id;
        const amount = details.purchase_units[0].amount.value;

        axios.post('http://localhost:8081/api/payment-success', { orderId, payerId, amount })
            .then((response) => {
                console.log('Payment data saved:', response.data);
                generateReceipt(orderId);
                setShowConfetti(true);
                // SweetAlert success message
                Swal.fire({
                    title: 'Payment Successful!',
                    text: 'Your payment has been processed successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    setShowConfetti(false); 
                });
            })
            .catch((error) => {
                console.error('Error recording payment:', error);
                setErrorMessage('Payment recording failed. Please try again.');
            });
    };

    const generateReceipt = (orderId) => {
        axios.get(`http://localhost:8081/api/receipt/${orderId}`, { responseType: 'blob' })
            .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `receipt-${orderId}.pdf`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch((error) => {
                console.error('Error generating receipt:', error);
                setErrorMessage('Receipt generation failed.');
            });
    };

    return (
        <div className='buy-now'>
            {showConfetti && <Confetti />}
            <h1 style={{ fontSize: "20px" }}>Welcome to Product Buying Section!</h1>
            <h1>Buy Now</h1>
            <hr />
            
            {cartItems.length > 0 ? (
                <div>
                    <h3>Cart Items</h3>                  
                    <ul style={{ justifyContent: "left", textAlign: "left" }}>
                        {cartItems.map(item => (
                            <li key={item.ID}>
                                {item.productName} - ₹{item.price} x {item.quantity}
                            </li>
                        ))}
                    </ul>
                    <hr />
                    <h2>Total Price: ₹{totalPrice}</h2>
                </div>
            ) : (
                <p>Your cart is empty</p>
            )}

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            
            <div id="paypal-button-container"></div>
        </div>
    );
};

export default BuyNow;
