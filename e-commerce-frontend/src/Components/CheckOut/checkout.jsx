import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


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
        }, 2000);
    };

    return (
        <div className="container mt-5">
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
                                            <button type="button" className="btn btn-primary mx-1" disabled={loading}>Pay by Razorpay</button>
                                            <button type="button" className="btn btn-warning mx-1" disabled={loading}>Pay Online</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-5">
                    <div className="card">
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Product Name</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Product 1</td>
                                        <td>Rs100.00</td>
                                    </tr>
                                    <tr>
                                        <td>Product 2</td>
                                        <td>Rs50.00</td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td>Total</td>
                                        <td>Rs150.00</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
