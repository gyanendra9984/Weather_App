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
    return sun; 
};

const Hourly_forecast = ({ weather }) => {
    if (!weather || !weather.days || !weather.days[0] || !weather.days[0].hours) return null;

    const hours = weather.days[0].hours;

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="w-[95%] md:w-[70%] min-w h-[27rem] py-2 md:py-4 bg-gray-100 rounded-md overflow-y-auto custom-scrollbar">
                <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                    {hours.map((hour) => (
                        <div key={hour.datetime} className="flex flex-col items-center p-4 bg-white shadow-md rounded-md w-40">
                            <div className="text-lg font-semibold">{new Date(hour.datetimeEpoch * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                            <div className="text-4xl my-2">
                                <img src={getWeatherIcon(hour.icon)} alt="weather icon" className="w-12 h-12" />
                            </div>
                            <div className="text-lg">{hour.temp}°C</div>
                            <div className="text-sm text-gray-500">{hour.conditions}</div>
                            <div className="text-sm text-gray-500">Precip: {hour.precip}mm</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Hourly_forecast;
