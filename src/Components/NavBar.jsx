import React, { useState, useEffect } from 'react';
import './nav.css';
import { FaBatteryFull } from 'react-icons/fa';

export default function NavBar() {
  const [chargePercentage, setChargePercentage] = useState(90); // Initial charge percentage
  
  useEffect(() => {
    // Function to update charge percentage every hour
    const updateChargePercentage = () => {
      // Decrement the current charge percentage by 1
      setChargePercentage(prevChargePercentage => prevChargePercentage - 1);
    };

    // Call the update function initially
    updateChargePercentage();

    // Schedule the update function to run every hour
    const intervalId = setInterval(updateChargePercentage, 3600000); // 1 hour in milliseconds

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures that the effect runs only once on component mount

  return (
    <div className='navBar'>
      <div>
        <h1>HUMAN DETECTION</h1>
      </div>
      <div style={{ display: 'flex' }}>
        <FaBatteryFull className='battery' />
        <span style={{ marginLeft: '20px' }}>{chargePercentage}%</span>
      </div>
    </div>
  );
}
