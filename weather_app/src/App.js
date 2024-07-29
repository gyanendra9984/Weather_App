import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoIosSearch } from "react-icons/io";
import Weather_forecast from "./Component/Weather_forecast";
import Fifteenday_forecast from "./Component/Fifteenday_forecast";
import Hourly_forecast from "./Component/Hourly_forecast";
import clear from "./assets/clear.avif";
import rain from "./assets/rain.avif";
import snow from "./assets/snow.avif";
import storm from "./assets/storm.avif";
import fog from "./assets/fog.avif";
import cloud from "./assets/cloud.avif";

const getBackground = (icon) => {
  if (icon.toLowerCase().includes("clear")) {
    return clear;
  } else if (icon.toLowerCase().includes("cloud")) {
    return cloud;
  } else if (icon.toLowerCase().includes("rain")||icon.toLowerCase().includes("shower")) {
    return rain;
  } else if (icon.toLowerCase().includes("snow")) {
    return snow;
  } else if (icon.toLowerCase().includes("storm")||icon.toLowerCase().includes("thunder")) {
    return storm;
  } else if (icon.toLowerCase().includes("fog")) {
    return fog;
  } 
  return clear; 
};

const App = () => {
  const [weather, setWeather] = useState({});
  const [yesterday, setYesterday] = useState({});
  const [hourly, setHourly] = useState({});
  const [place, setplace] = useState("Rupnagar");
  const [searchplace, setsearchplace] = useState("");
  const [option, setOption] = useState("hourly_forecast");
  const [backgroundImage, setBackgroundImage] = useState(clear);

  const API_KEY = process.env.REACT_APP_WEATHER_KEY;
  const BASE_URL =
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";

  const fetchWeatherData = async () => {
    try {
      const url = `${BASE_URL}/${place}?unitGroup=metric&include=days&key=${API_KEY}&contentType=json`;
      const response = await axios.get(url);
      setWeather(response.data);
    } catch (error) {
      console.error(`Error fetching data:`, error);
    }
  };
  const value = {
    resolvedAddress: "Rupnagar, Punjab, India",
    days: [
      {
        temp: 29.3,
        feelslike: 31.8,
        humidity: 70.3,
        snow: 0.0,
        windspeed: 8.0,
        winddir: 113.0,
        visibility: 16.0,
        sunrise: "06:09:00",
        sunset: "18:25:00",
        conditions: "Clear",
        icon: "clear-day",
      },
    ],
  };

  const fetchYesterdayData = async () => {
    try {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split("T")[0];

      const url = `${BASE_URL}/${place}/${yesterdayStr}/${yesterdayStr}?unitGroup=metric&include=days&key=${API_KEY}&contentType=json`;
      const response = await axios.get(url);
      setYesterday(response.data);
    } catch (error) {
      console.error(`Error fetching data:`, error);
    }
  };

  const fetchHourlyData = async () => {
    try {
      const today = new Date();
      const todayStr = today.toISOString().split("T")[0];
      const url = `${BASE_URL}/${place}/${todayStr}T00:00:00/${todayStr}T23:59:00?unitGroup=metric&include=hours&key=${API_KEY}&contentType=json`;
      const response = await axios.get(url);
      setHourly(response.data);
    } catch (error) {
      console.error(`Error fetching data:`, error);
    }
  };

  useEffect(() => {
    fetchWeatherData();
    fetchYesterdayData();
    fetchHourlyData();
  }, [place]);


  const handleSearch = () => {
    setplace(searchplace);
  };
  useEffect(() => {
    if (weather && weather.days && weather.days[0] && weather.days[0].icon) {
      setBackgroundImage(getBackground(weather.days[0].icon));
    }
  }, [weather]);

  return (
    <div
      className="h-screen w-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="flex flex-col p-5 font-sans space-y-4 items-center">
        <div className="flex items-center gap-3 w-full max-w-4xl">
          <input
            type="text"
            onChange={(e) => setsearchplace(e.target.value)}
            placeholder="Enter location"
            className="px-3 py-2 border border-gray-300 rounded-md flex-1 min-w-0"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer"
          >
            Search
          </button>
        </div>

        <div className="flex flex-wrap gap-3 justify-center w-full max-w-4xl">
          <button
            onClick={() => setOption("today")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer hover:bg-black hover:text-white ${
              option === "today"
                ? "bg-black text-white"
                : "bg-gray-300 text-black"
            }`}
          >
            <IoIosSearch />
            Today
          </button>
          <button
            onClick={() => setOption("tomorrow")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer hover:bg-black hover:text-white ${
              option === "tomorrow"
                ? "bg-black text-white"
                : "bg-gray-300 text-black"
            }`}
          >
            <IoIosSearch />
            Tomorrow
          </button>
          <button
            onClick={() => setOption("yesterday")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer hover:bg-black hover:text-white ${
              option === "yesterday"
                ? "bg-black text-white"
                : "bg-gray-300 text-black"
            }`}
          >
            <IoIosSearch />
            Yesterday
          </button>
          <button
            onClick={() => setOption("fifteenday_forecast")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer hover:bg-black hover:text-white ${
              option === "fifteenday_forecast"
                ? "bg-black text-white"
                : "bg-gray-300 text-black"
            }`}
          >
            <IoIosSearch />
            15-Days Forecast
          </button>
          <button
            onClick={() => setOption("hourly_forecast")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer hover:bg-black hover:text-white ${
              option === "hourly_forecast"
                ? "bg-black text-white"
                : "bg-gray-300 text-black"
            }`}
          >
            <IoIosSearch />
            Hourly Forecast
          </button>
        </div>
      </div>
      <div>
        {option === "today" && weather.days && weather.days.length > 0 && (
          <Weather_forecast
            address={weather.resolvedAddress}
            weather={weather.days[0]}
          />
        )}
        {option === "tomorrow" && weather.days && weather.days.length > 1 && (
          <Weather_forecast
            address={weather.resolvedAddress}
            weather={weather.days[1]}
          />
        )}
        {option === "yesterday" &&
          yesterday.days &&
          yesterday.days.length > 0 && (
            <Weather_forecast
              address={yesterday.resolvedAddress}
              weather={yesterday.days[0]}
            />
          )}
        {option === "fifteenday_forecast" && weather && (
          <Fifteenday_forecast weather={weather} />
        )}
        {option === "hourly_forecast" &&
          hourly &&
          hourly.days &&
          hourly.days[0] &&
          hourly.days[0].hours && <Hourly_forecast weather={hourly} />}
      </div>
    </div>
  );
};

export default App;
