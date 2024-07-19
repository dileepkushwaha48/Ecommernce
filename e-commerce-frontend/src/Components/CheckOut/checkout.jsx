import React, { useState } from 'react';
import axios from 'axios';
import './checkout.css';

function Checkout() {
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
        if (!checkoutInput.firstname || !checkoutInput.lastname || !checkoutInput.phone || !checkoutInput.email || !checkoutInput.address || !checkoutInput.city || !checkoutInput.state || !checkoutInput.zipcode) {
            setError({ message: 'All fields are mandatory' });
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setError({});
            alert('Order placed successfully!');
        }, 500);
    };

    const handleESEWA = async () => {
        setLoading(true);
        try {
            const orderResponse = await axios.post('http://localhost:4000/create-esewa-payment', {
                amount: 1000 * 100, // Amount in paise
                orderId: 'order_id_' + Date.now()
            });

            const { url, token, amount, orderId, merchantId } = orderResponse.data;

            // Redirect to eSewa
            window.location.href = `${url}?amt=${amount}&rid=${orderId}&scd=${merchantId}&token=${token}`;
        } catch (error) {
            console.error('Payment error:', error);
            alert('Something went wrong. Please try again later.');
        }
        setLoading(false);
    };

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
                                    {/* Form fields */}
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
                                            <button type="button" className="btn btn-primary mx-1" onClick={handleESEWA} disabled={loading}>Pay with eSewa</button>
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
