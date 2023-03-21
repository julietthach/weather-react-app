import "./App.css";
import React, { useState, useEffect } from "react";
import WeatherIcon from "./WeatherIcon";


export default function WeatherForecastDay(props) {
const forecastData = props.data;
const [maxTemp, setMaxTemp] = useState(forecastData.temp.max);
const [minTemp, setMinTemp] = useState(forecastData.temp.min);

useEffect(() => {
  const convertTemp = (temp, unit) => {
    if (unit === "imperial") {
      return Math.round((temp * 9/5) + 32);
    } else {
      return Math.round(temp);
    }
  }

  const updatedMaxTemp = convertTemp(forecastData.temp.max, props.unit);
  const updatedMinTemp = convertTemp(forecastData.temp.min, props.unit);
  setMaxTemp(updatedMaxTemp);
  setMinTemp(updatedMinTemp);
}, [props.unit, forecastData.temp.max, forecastData.temp.min]);


function day() {
    let date = new Date(props.data.dt * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
}

return( 
            <div>  
             <div className="forecastDay">{day()}</div>
            <WeatherIcon code={forecastData.weather[0].icon} size={65}/>
            <div>
            <span className="forecastTemp-max">{maxTemp}°</span>
             <span className="forecastTemp-min">{minTemp}°</span>
             </div>
            </div>
  );
}