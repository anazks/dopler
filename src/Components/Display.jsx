import React, { useEffect, useState } from 'react';
import './display.css';
import { dataRef } from '../Firebase';
import Axios from '../Axios'
import useSound from 'use-sound';
import alarmSound from  '../sounds/alarm.mp3'
import normal from '../sounds/normal.mp3'
function Display() {
  const [temp, setTemp] = useState(null);
  const getDatafromDB = () => {
    try {
       // handlePlay2();
        
        var previousDistance = 0;
        var lastUpdateTime = new Date().getTime();
        var distanceChanges = 0;
      dataRef.ref().child('test').on('value', (data) => {
        const getData = Object.values(data.val());
        console.log(getData,"from firebase");
        setTemp(getData[2]);
        let currentDistance = getData[0];
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
      console.log(1)
    //   handlePlay2()  

    }, 1000);
    
    // Clear the interval when the component unmounts
    return () => clearInterval(fetchDataInterval);
   
  }, []);

  return (
    <div className='main'>
      
      <div className="rate">
        <div>
            <span>Temparature</span>
            <h1>40%</h1>
        </div>
      </div>
      <div className="rate">
        <div>
            <span>Movement Detection</span>
            <h1>Null</h1>
        </div>
      </div>
      <div className="rate">
        <div>
            <span>Humidity</span>
            <h1>40%</h1>
        </div>
      </div>
     
     
    </div>


  );
}

export default Display;
