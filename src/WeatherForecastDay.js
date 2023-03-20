import React from "react";
import "./App.css"
import WeatherIcon from "./WeatherIcon";

export default function WeatherForecastDay(props) {
  const forecastData = props.data.list;
  const day = props.day;


  function getDate() {
    let date = new Date(props.data.list[day].dt * 1000);
    let dayOf = date.getDay()

    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[dayOf];
  }


return (
    <div className="DailyWeatherForecast">
            <div className="forecastDay">{getDate()}</div>
            <WeatherIcon code={forecastData[day].weather[0].icon} size={10}/>
            <span className="forecastTemp-max">{Math.round(forecastData[day].main.temp_max)}°</span>
            <span className="forecastTemp-min">{Math.round(forecastData[day].main.temp_min)}°</span>

    </div>
  );}