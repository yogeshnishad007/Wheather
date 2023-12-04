
import React, { useState } from 'react';
import './App.css'; 
const App = () => {
  const [query, setQuery] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [show,setShow]=useState(false)

  const apiKey = '840de593b7028de6e424162454790fe5';
 

  const handleSearch = async () => {
    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${apiKey}`);
      const data = await res.json();
      console.log("Weather",data)
      setWeatherData(data);
      setShow(true)
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Enter city name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {weatherData && (
         <div className={show?"pop":"hide"}>
          <h2>City: {weatherData.name}</h2>
          <h3>Temperature: {weatherData.main.temp}°C</h3>
          <h3>Weather: {weatherData.weather[0].main} - {weatherData.weather[0].description}</h3>
          <div>
            <button onClick={()=>setShow(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
