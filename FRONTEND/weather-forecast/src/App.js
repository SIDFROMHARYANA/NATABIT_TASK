// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';


function App() {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [additionalCities, setAdditionalCities] = useState(['Chennai', 'Delhi', 'Kolkata', 'Mumbai', 'London']);
  const [showAdditionalCities, setShowAdditionalCities] = useState(false);

  useEffect(() => {
    const storedLocations = JSON.parse(localStorage.getItem('locations'));
    
    if (storedLocations) {
      setLocations(storedLocations);
    }

    const storedLocation = localStorage.getItem('selectedLocation');
    if (storedLocation && storedLocation >0) {
      setSelectedLocation(storedLocation);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('locations', JSON.stringify(locations));
  }, [locations]);

  useEffect(() => {
    if (selectedLocation) {
      axios.get(`https://api.weatherapi.com/v1/forecast.json?key=a93d5866a99f49a180a192544242301&q=${selectedLocation}&days=4&aqi=no&alerts=no`)
        
      .then(response => {
          // Process the response and update state
          setWeatherData(response.data);
        })
        .catch(error => console.error('Error fetching weather data:', error));
    }
  }, [selectedLocation]);

  const handleLocationChange = (e) => {
    const newLocation = e.target.value;
    
    setSelectedLocation(newLocation);
    
    localStorage.setItem('selectedLocation', newLocation);
  };

  const handleAddMore = () => {
    
    setShowAdditionalCities(!showAdditionalCities);
  };

  const handleAdditionalCitySelect = (additionalCity) => {
    
    setLocations(prevLocations => [...prevLocations, additionalCity]);
   
    setSelectedLocation(additionalCity);
   
    localStorage.setItem('selectedLocation', additionalCity);
  };

  return (
    <div className="app-container" style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '10px', maxWidth: '800px', margin: 'auto' }}>
      <h1 style={{ textAlign: 'center' }}>Weather Forecast</h1>

      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        {locations.length === 0 && (
          <button onClick={handleAddMore}>Add More +</button>
        )}
        
        {locations.length > 0 && (
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            
            {locations.map(location => (
              
              <div key={location} style={{ display: 'inline-block', margin: '5px', padding: '8px', border: '1px solid #ccc', cursor: 'pointer', backgroundColor: selectedLocation === location ? 'blue' : 'white' }} onClick={() => setSelectedLocation(location)}>
                {location}
              </div>
            
            ))}
            
            <button onClick={handleAddMore} style={{ marginLeft: '10px' }}>Add More +</button>
          
          </div>
        )}
        {showAdditionalCities && (
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
            {additionalCities.map(city => (
              
              <div key={city} style={{ display: 'inline-block', margin: '5px', padding: '8px', border: '1px solid blue', cursor: 'pointer' }} onClick={() => handleAdditionalCitySelect(city)}>
                {city}
              </div>
           
           ))}
          </div>
        )}
      </div>

      {selectedLocation && weatherData && (
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
          
          <h3>4 Day Forecast</h3>
          
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {weatherData.forecast.forecastday.map(day => (
              
              <div key={day.date_epoch} className="forecast-card" style={{ margin: '20px', padding: '10px', border: '1px solid blue', backgroundColor: 'lightblue', textAlign: 'center' }}>
                
                <h4>{new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' })}</h4>
                
                <p>{new Date(day.date).toLocaleDateString('en-US')}</p>
                
                <p>Temperature: {day.day.avgtemp_c}°C</p>
                
                <p>Condition: {day.day.condition.text}</p>
              </div>
           
           ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
