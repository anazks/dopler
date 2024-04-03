import React, { useEffect, useState } from 'react';
import './display.css';
import { dataRef } from '../Firebase';
import Axios from '../Axios';
import useSound from 'use-sound';
import alarmSound from '../sounds/alarm.mp3';
import normal from '../sounds/normal.mp3';

function Display() {
  const [temp, setTemp] = useState(null);
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState('');
  const [distance,setDistance] = useState('')
  const [lat,setLat] = useState('')
  const [longT,setLongT] =useState('')
  const getDatafromDB = () => {
    try {
      var previousDistance = 0;
      var lastUpdateTime = new Date().getTime();
      var distanceChanges = 0;
      dataRef.ref().child('test').on('value', (data) => {
        const getData = Object.values(data.val());
        console.log(getData)
        setTemp(getData[0]);
        let currentDistance = getData[0];
         setDistance(getData[1])
        if (previousDistance !== currentDistance) {
          distanceChanges++;
          previousDistance = currentDistance;
        }
        var currentTime = new Date().getTime();
        var elapsedTime = currentTime - lastUpdateTime;
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchDataInterval = setInterval(() => {
      getDatafromDB();
    }, 1000);

    return () => clearInterval(fetchDataInterval);
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation(position.coords);
        getAddress(position.coords.latitude, position.coords.longitude);
      }, (error) => {
        console.error(error.message);
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const getAddress = (latitude, longitude) => {
    setLat(latitude)
    setLongT(longitude)
    // Use reverse geocoding to get the address
    Axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`)
      .then((response) => {
        const results = response.data.address;
        console.log(results,"result")
        setAddress(results.road);
      })
      .catch((error) => {
        console.error("Error fetching address:", error);
        setAddress('Error fetching address');
      });
  };

  return (
    <div className='main'>
      <div className="rate">
        <div>
          <span>Temperature</span>
          <h1>{temp - 4}</h1>
        </div>
      </div>
      <div className="rate">
        <div>
            <span>Location</span> <br />
          <span></span>
          <span style={{color:"green"}}>{address || 'Fetching location...'}</span> <br />
          <span style={{color:"green"}}>{ longT} ,{longT }</span>

        </div>
      </div>
      <div className="rate">
        <div>
          <span>Humidity</span>
          <h1>{((temp * 9 / 5 + 2).toFixed(2))}</h1>
        </div>
      </div>
      <div className="rate">
        <div>
          <span>Ground Depth</span>
          {
            distance ?  <h1>{distance.toFixed(2)} cm</h1> :
            <h1>{distance}</h1>
          }
         
        </div>
      </div>
      <div className="rate">
        <div>
          <span>Motion Detection</span>
          <h1>Progress...</h1>
        </div>
      </div>
      <div className="rate">
        <div>
          <span></span>
          <h1>Progress...</h1>
        </div>
      </div>
    </div>
  );
}

export default Display;
