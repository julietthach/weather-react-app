import React from "react";
import WeatherIcon from "./WeatherIcon";

export default function WeatherForecastDay(props) {
let forecastData = props.data;
let maxTemp = Math.round(forecastData.temp.min);
let minTemp = Math.round(forecastData.temp.max);

function day() {
    let date = new Date(props.data.dt * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
}
return( 
            <div>  
             <div className="forecastDay">{day()}</div>
            <WeatherIcon code={forecastData.weather[0].icon} size={4}/>
            <span className="forecastTemp-max">{maxTemp}°</span>
             <span className="forecastTemp-min">{minTemp}°</span>
            </div>
  );
}