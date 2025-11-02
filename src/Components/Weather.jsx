import {React,  useEffect , useRef, useState} from 'react';
import './Weather.css'
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';
import humidity_icon from '../assets/humidity.png';

const Weather = ({ city = '', temp = '', description = '' }) => {
    const [weatherData, setWeatherData]=useState({});
    const inputref=useRef()
    const allIcons={
        "01d":clear_icon,
        "01n":clear_icon,
        "02d":cloud_icon,
        "02n":cloud_icon,
        "03d":cloud_icon,
        "03n":cloud_icon,
        "04d":drizzle_icon,
        "04n":drizzle_icon,
        "09d":rain_icon,
        "09n":rain_icon,
        "10d":rain_icon,
        "10n":rain_icon,
        "13d":snow_icon,
        "13n":snow_icon,
    }
      const search = async (city) => {
  city = city.trim();
  if (!city) {
    alert("Enter City Name");
    return;
  }

  try {
    const proxy = "https://corsproxy.io/?";
    const url = `${proxy}https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=d74345bb8559f80cb7e017cd71c26cb1`;
    console.log("API URL:", url);

    const response = await fetch(url);
    if (!response.ok) {
        const data = await response.json();
      alert(data.message);
     return;
    }

    const data = await response.json();
    console.log(data);

    const icon = allIcons[data.weather[0].icon] || clear_icon;

    setWeatherData({
      humidity: data.main.humidity,
      wind: data.wind.speed,
      temperature: Math.floor(data.main.temp),
      location: data.name,
      icon: icon,
    });
  } catch (error) {
    setWeatherData(false);
    console.error("Failed to fetch weather data:", error);
    alert("Could not fetch weather data. Please try again.");
  }
};
  
    useEffect(() => {
        search("London");
    },[]);
    return (
        <div className='weather'>
            <div className="search-bar">
                <input ref={inputref}type="text" placeholder='search'/>
                <img src={search_icon} alt="" onClick={()=>search(inputref.current.value)}/>
            </div>
            {weatherData?<><img src={weatherData.icon} alt="" className='weather-icon' />
            <p className='temprature'>{weatherData.temperature}°c</p>
            <p className='location'>{weatherData.location}</p>
            <div className="weather-data">
                <div className="col">
                    <img src={humidity_icon} alt="" />
                    <div>
                        <p>{weatherData.humidity} %</p>
                        <span>Humidity</span>
                    </div>
                </div>
                 <div className="col">
                    <img src={wind_icon} alt="" />
                    <div>
                        <p>{weatherData.wind} km/h</p>
                        <span>Wind Speed</span>
                    </div>
                </div>
            </div></>:<></>}
            
        </div>
    );

}
export default Weather;