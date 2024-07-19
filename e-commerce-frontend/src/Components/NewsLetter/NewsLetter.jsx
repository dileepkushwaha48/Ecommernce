import React, { useState } from 'react';
import './NewsLetter.css';

const NewsLetter = () => {
  // State to hold the email address
  const [email, setEmail] = useState('');
  // State to manage subscription status
  const [subscribed, setSubscribed] = useState(false);
  // State to manage error messages (optional)
  const [error, setError] = useState('');

  // Function to handle email input change
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Basic email validation
    if (!email) {
      setError('Please enter your email address');
      return;
    }
  
    console.log('Subscribing with email:', email);
    // Reset the email input
    setEmail('');
    // Update subscription status
    setSubscribed(true);
    // Optionally clear error state
    setError('');

    // Show alert on successful subscription
    window.alert('Subscribed successfully!');
  };

  return (
    <div className='newsletter'>
      <h1>Get Exclusive Offers On Your Email</h1>
      <p>Subscribe to our newsletter and stay updated.</p>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            placeholder='Your email id'
            value={email}
            onChange={handleEmailChange}
          />
          <button type="submit">Subscribe</button>
        </div>
        {/* Display error message if any */}
        {error && <p className="error">{error}</p>}
        {/* Display confirmation message */}
        {subscribed && <p className="success">Subscribed successfully!</p>}
      </form>
    </div>
  );
};

export default NewsLetter;
