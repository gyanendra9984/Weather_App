import React from 'react';
import sun from "../assets/sun.png";
import cloud from "../assets/cloud.png";
import rain from "../assets/rain.png";
import snow from "../assets/snow.png";
import fog from "../assets/fog.png";
import storm from "../assets/storm.png";
import windy from "../assets/windy.png";

const getWeatherIcon = (icon) => {
  if (icon.toLowerCase().includes('clear')) {
    return sun;
  } else if (icon.toLowerCase().includes('cloudy')) {
    return cloud;
  } else if (icon.toLowerCase().includes('rain')) {
    return rain;
  } else if (icon.toLowerCase().includes('snow')) {
    return snow;
  } else if (icon.toLowerCase().includes('fog')) {
    return fog;
  } else if (icon.toLowerCase().includes('storm')) {
    return storm;
  } else if (icon.toLowerCase().includes('wind')) {
    return windy;
  }
  return sun; // Default icon
};

const formatDate = (epochTime, locale) => {
  const date = new Date(epochTime * 1000);
  const dayName = date.toLocaleDateString(locale, { weekday: 'long' });
  const dayNumber = date.getDate();
  const monthName = date.toLocaleDateString(locale, { month: 'long' });
  return `${dayName}, ${dayNumber} ${monthName}`;
};

const Fifteenday_forecast = ({ weather }) => {
  if (!weather || !weather.days || weather.days.length === 0) return null;

  const locale = 'en-US'; 

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[95%] md:w-[70%] h-[22rem] md:h-[27rem] p-2 md:py-4 bg-gray-100 rounded-md overflow-y-auto custom-scrollbar">
        <div className="flex flex-wrap justify-center gap-2 md:gap-4">
          {weather.days.map((day) => (
            <div key={day.datetime} className="flex flex-col items-center p-4 bg-white shadow-md rounded-md w-40">
              <div className="text-lg font-semibold">{formatDate(day.datetimeEpoch, locale)}</div>
              <div className="text-4xl my-2">
                <img src={getWeatherIcon(day.icon)} alt="weather icon" className="w-12 h-12" />
              </div>
              <div className="text-lg">{day.tempmax}°C / {day.tempmin}°C</div>
              <div className="text-sm text-gray-500">{day.conditions}</div>
              <div className="text-sm text-gray-500">Precip: {day.precip}mm</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

};



export default Fifteenday_forecast;
