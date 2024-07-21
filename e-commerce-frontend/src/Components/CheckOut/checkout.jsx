import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './checkout.css';

function Checkout() {

    useEffect(() => {
        if (window.Razorpay) {
            console.log('Razorpay script loaded successfully');
        } else {
            console.log('Razorpay script not loaded');
        }
    }, []);

    const [checkoutInput, setCheckoutInput] = useState({
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zipcode: '',
    });

    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setCheckoutInput(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic form validation
        if (!checkoutInput.firstname || !checkoutInput.lastname || !checkoutInput.phone || !checkoutInput.email || !checkoutInput.address || !checkoutInput.city || !checkoutInput.state || !checkoutInput.zipcode) {
            setError({ message: 'All fields are mandatory' });
            return;
        }

        // Simulating loading state
        setLoading(true);

        // Simulate order placement or payment processing (setTimeout for demo purposes)
        setTimeout(() => {
            // Simulate success
            setLoading(false);
            setError({});
            alert('Order placed successfully!');
            // Optionally redirect to a thank you page or clear form inputs
        }, 500);
    };

    const handleCashOnDelivery = () => {
        setLoading(true);

        // You can add backend call here to process Cash on Delivery order
        axios.post('http://localhost:4000/create-order', {
            ...checkoutInput,
            paymentMethod: 'Cash on Delivery'
        }).then(response => {
            setLoading(false);
            alert('Order placed successfully!');
            // Optionally redirect to a thank you page or clear form inputs
        }).catch(error => {
            setLoading(false);
            alert('your payment delivery on cash!');
            console.error('Order creation error:', error);
        });
    };

    const handleEsewaPayment = async () => {
        setLoading(true);
        try {
            const orderResponse = await axios.post('http://localhost:4000/create-order', {
                amount: 1000, // Amount in the smallest currency unit
                currency: 'NPR',
                paymentMethod: 'eSewa'
            });

            const { amount, currency, transactionId } = orderResponse.data;

            // Here you would implement the eSewa payment flow
            // For example, redirect to eSewa payment page
            window.location.href = `https://esewa.com.np/epay/main?amt=${amount}&txAmt=0&psc=0&sc=0&pid=${transactionId}&su=http://localhost:4000/payment-success&fu=http://localhost:4000/payment-failure`;

        } catch (error) {
            console.error('Order creation error:', error);
            // alert('Something went wrong. Please try again later.');
        }
        setLoading(false);
    };

    // const handleRazorpayPayment = async () => {
    //     setLoading(true);
    //     try {
    //         const orderResponse = await axios.post('http://localhost:4000/create-order', {
    //             amount: 1000 * 100, // Amount in paise
    //             currency: 'INR',
    //             receipt: 'receipt_order_74394'
    //         });

    //         const { id, amount, currency } = orderResponse.data;

    //         const options = {
    //             key: 'YOUR_RAZORPAY_KEY_ID', // Replace with your Razorpay Key ID
    //             amount: amount,
    //             currency: currency,
    //             name: 'Your Company Name',
    //             description: 'Test Transaction',
    //             image: 'https://example.com/your_logo',
    //             order_id: id,
    //             handler: async function (response) {
    //                 try {
    //                     const verifyResponse = await axios.post('http://localhost:4000/verify-payment', {
    //                         razorpay_order_id: response.razorpay_order_id,
    //                         razorpay_payment_id: response.razorpay_payment_id,
    //                         razorpay_signature: response.razorpay_signature
    //                     });

    //                     if (verifyResponse.data.status === 'success') {
    //                         alert('Payment successful!');
    //                     } else {
    //                         alert('Payment verification failed!');
    //                     }
    //                 } catch (error) {
    //                     console.error('Verification error:', error);
    //                     alert('Payment verification failed!');
    //                 }
    //             },
    //             prefill: {
    //                 name: `${checkoutInput.firstname} ${checkoutInput.lastname}`,
    //                 email: checkoutInput.email,
    //                 contact: checkoutInput.phone,
    //             },
    //             notes: {
    //                 address: checkoutInput.address
    //             },
    //             theme: {
    //                 color: '#3399cc'
    //             }
    //         };

    //         if (window.Razorpay) {
    //             const rzp1 = new window.Razorpay(options);
    //             rzp1.open();
    //         } else {
    //             console.error('Razorpay script is not loaded');
    //             alert('Payment gateway is not available');
    //         }
    //     } catch (error) {
    //         console.error('Order creation error:', error);
    //         alert('Something went wrong. Please try again later.');
    //     }
    //     setLoading(false);
    // };

    return (
        <div className="container">
            <h2 className="text-center mb-5">Checkout</h2>
            <div className="row">
                <div className="col-md-7">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Basic Information</h4>
                        </div>
                        <div className="card-body">
                            <form id="checkoutForm" onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>First Name</label>
                                            <input type="text" name="firstname" className="form-control" value={checkoutInput.firstname} onChange={handleInput} required />
                                            <small className="text-danger">{error.firstname}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Last Name</label>
                                            <input type="text" name="lastname" className="form-control" value={checkoutInput.lastname} onChange={handleInput} required />
                                            <small className="text-danger">{error.lastname}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Phone Number</label>
                                            <input type="tel" name="phone" className="form-control" value={checkoutInput.phone} onChange={handleInput} required />
                                            <small className="text-danger">{error.phone}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Email Address</label>
                                            <input type="email" name="email" className="form-control" value={checkoutInput.email} onChange={handleInput} required />
                                            <small className="text-danger">{error.email}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Full Address</label>
                                            <textarea rows="3" name="address" className="form-control" value={checkoutInput.address} onChange={handleInput} required></textarea>
                                            <small className="text-danger">{error.address}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>City</label>
                                            <input type="text" name="city" className="form-control" value={checkoutInput.city} onChange={handleInput} required />
                                            <small className="text-danger">{error.city}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>State</label>
                                            <input type="text" name="state" className="form-control" value={checkoutInput.state} onChange={handleInput} required />
                                            <small className="text-danger">{error.state}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Zip Code</label>
                                            <input type="text" name="zipcode" className="form-control" value={checkoutInput.zipcode} onChange={handleInput} required />
                                            <small className="text-danger">{error.zipcode}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group text-end">
                                            <button type="submit" className="btn btn-primary mx-1" disabled={loading}>Place Order</button>
                                            {/* <button type="button" className="btn btn-primary mx-1" onClick={handleRazorpayPayment} disabled={loading}>Pay by Razorpay</button> */}
                                            <button type="button" className="btn btn-primary mx-1" onClick={handleCashOnDelivery} disabled={loading}>Cash On Delivery</button>
                                            <button type="button" className="btn btn-primary mx-1" onClick={handleEsewaPayment} disabled={loading}>Pay by eSewa</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
