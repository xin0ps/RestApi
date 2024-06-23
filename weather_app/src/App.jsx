// App.js

import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import './styles.scss';

function App() {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [weather, setWeather] = useState(null);
  const [backgroundClass, setBackgroundClass] = useState('default');



  


  const getWeather = async () => {
    try {
      let response;
      if (city !== '') {
        response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=69444a9483b5465abca191200242306&q=${city}`);
      } else if (country !== '') {
        response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=69444a9483b5465abca191200242306&q=${country}`);
      } else {
        console.error("Please enter a city or country.");
        return;
      }
      
      console.log(response.data);
      setWeather(response.data);
      updateBackground(response.data);
    } catch (error) {
      console.error("Error", error);
      setBackgroundClass('default');
      setWeather(null);
    }
  };

  const updateBackground = (weatherData) => {

    console.log(weatherData.location.localtime)
    if (!weatherData) {
      setBackgroundClass('default');
      return;
    }

    const time= weatherData.location.localtime.split(" ");
    const hour = time[1].split(":");
    const last= hour[0];
    console.log(last);
    if (last >= 19 || last < 6) {
      setBackgroundClass('night');
      console.log("night")
    } else {
      setBackgroundClass('day');
      console.log("day")

    }
  };

  return (
    <div className={`${backgroundClass}`}>
    <div className={`mainDiv`}>
      <h1 className="mainText">Weather App</h1>
      <div className='fieldsDiv'>
        <input 
          type="text" 
          placeholder="City" 
          value={city} 
          onChange={(e) => setCity(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Country" 
          value={country} 
          onChange={(e) => setCountry(e.target.value)} 
        />
        <button onClick={getWeather}>Get Weather</button>
      </div>
      {weather && (
        <div className='weatherDiv'>
          <div className='dataDiv'>
            <h2>{weather.location.name}, {weather.location.country}</h2>
            <p>Temperature: {weather.current.temp_c} °C</p>
            <p>Weather: {weather.current.condition.text}</p>
            <p>Wind Speed: {weather.current.wind_kph} kph</p>
            <p>Time: {backgroundClass} - {weather.location.localtime} </p>
            <img src={weather.current.condition.icon} alt="Weather Icon" />
          </div>
        </div>
      )}
    </div>
    </div>
  );
}

export default App;
