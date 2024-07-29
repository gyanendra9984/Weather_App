import React, { useEffect, useState } from 'react';
import sun from "../assets/sun.png";
import cloud from "../assets/cloud.png";
import rain from "../assets/rain.png";
import snow from "../assets/snow.png";
import fog from "../assets/fog.png";
import storm from "../assets/storm.png";
import windy from "../assets/windy.png";

const useDate = () => {
    const locale = 'en-US'; 
    const [today, setDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date());
        }, 60 * 1000); 

        return () => {
            clearInterval(timer);
        };
    }, []);

    const day = today.toLocaleDateString(locale, { weekday: 'long' });
    const date = `${day}, ${today.getDate()} ${today.toLocaleDateString(locale, { month: 'long' })}`;
    const time = today.toLocaleTimeString(locale, { hour: 'numeric', hour12: true, minute: 'numeric' });

    return {
        date,
        time
    };
};

const Weather_forecast = ({ address, weather }) => {
    const [icon, setIcon] = useState("");
    const { date, time } = useDate(); 

    useEffect(() => {
        if (weather) {
            if (weather.icon.toLowerCase().includes('clear')) {
                setIcon(sun);
            } else if (weather.icon.toLowerCase().includes('cloudy')) {
                setIcon(cloud);
            } else if (weather.icon.toLowerCase().includes('rain')) {
                setIcon(rain);
            } else if (weather.icon.toLowerCase().includes('snow')) {
                setIcon(snow);
            } else if (weather.icon.toLowerCase().includes('fog')) {
                setIcon(fog);
            } else if (weather.icon.toLowerCase().includes('storm')) {
                setIcon(storm);
            } else if (weather.icon.toLowerCase().includes('wind')) {
                setIcon(windy);
            }
        }
    }, [weather]);

    if (!weather) return null;

    return (
        <div className="flex items-center justify-center ">
            <div className="w-96 h-auto bg-gray-200 p-4 rounded-md mx-2"> 
                <div className="flex justify-between items-center mb-4">
                    <div className="flex-shrink-0 w-20 h-20 flex items-center justify-center">
                        <img
                            src={icon}
                            alt={weather.conditions}
                            className="w-20 h-20"
                        />
                    </div>
                    <div className="ml-8">
                        <h2 className="text-2xl font-bold text-gray-800">{address}</h2>
                        <p className="text-lg text-gray-700 mt-1">Today - {date}</p>
                        <p className="text-lg text-gray-700">{time}</p>
                    </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                    <div className="text-center">
                        <p className="text-5xl font-extrabold text-gray-900">{weather.temp}°C</p>
                        <p className="text-xl text-gray-700 mt-1">{weather.conditions}</p>
                    </div>
                    <div className="text-center">
                        <p className="font-semibold text-gray-600">Feels Like</p>
                        <p className="text-lg text-gray-800">{weather.feelslike}°C</p>
                    </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                    <div className="text-center">
                        <p className="font-semibold text-gray-600">Humidity</p>
                        <p className="text-lg text-gray-800">{weather.humidity}%</p>
                    </div>
                    <div className="text-center">
                        <p className="font-semibold text-gray-600">Visibility</p>
                        <p className="text-lg text-gray-800">{weather.visibility} km</p>
                    </div>
                </div>
                <div className="flex justify-between items-center mb-4">
                    <div className="text-center">
                        <p className="font-semibold text-gray-600">Sunrise</p>
                        <p className="text-lg text-gray-800">{weather.sunrise}</p>
                    </div>
                    <div className="text-center">
                        <p className="font-semibold text-gray-600">Sunset</p>
                        <p className="text-lg text-gray-800">{weather.sunset}</p>
                    </div>
                </div>
                <div className="flex justify-between items-center ">
                    <div className="text-center">
                        <p className="font-semibold text-gray-600">Wind Speed</p>
                        <p className="text-lg text-gray-800">{weather.windspeed} km/h</p>
                    </div>
                    <div className="text-center">
                        <p className="font-semibold text-gray-600">Wind Direction</p>
                        <p className="text-lg text-gray-800">{weather.winddir}°</p>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Weather_forecast;
