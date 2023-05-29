import { React, useState, useEffect } from "react";
import "./styles.css";


const Weather = () => {
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState("");
  const [state, setState] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchApi = async () => {
      const apiKey = "d6a2654aa973d4455a529277fee7eb7c";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}&units=metric`;

      setLoading(true);

      try {
        const response = await fetch(url);
        const resJson = await response.json();
        setCity(resJson.main);
      } catch (error) {
        console.log("Error fetching weather data:", error);
      }

      setLoading(false); 
    };

    if (search) {
      fetchApi();
    }
  }, [state]);

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const handleClick = (event) => {
    event.preventDefault();
    setState(search);
  };

  return (
    <div className="weather-container">
      <h1 className="heading">Find Your City's Weather</h1>
      <form>
        <input
          className="input"
          onChange={handleChange}
          value={search}
          type="search"
          placeholder="Enter City Name"
        />
        <button className="button" onClick={handleClick} type="submit">
          Search
        </button>
      </form>
      {loading ? (
        <div className="loading-message">Loading...</div> // Render loading message when loading is true
      ) : city ? (
        <div className="weather-card">
          <h2 className="temp">{city.temp}&deg;C</h2>
          <h2 className="temp-range">
            Min: {city.temp_min}&deg;C / Max: {city.temp_max}&deg;C
          </h2>
          <h3 className="humidity">Humidity: {city.humidity}%</h3>
        </div>
      ) : null}

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Created by Rishi Mishra</p>
      </footer>
    </div>
  );
};

export default Weather;