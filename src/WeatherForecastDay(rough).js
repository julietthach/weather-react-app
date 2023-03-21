// import React, { useEffect, useState } from "react";
// import "./App.css"
// import WeatherIcon from "./WeatherIcon";

// export default function WeatherForecastDay(props) {
//   const [date, setDate] = useState();
//   const [forecastData, setForecastData] = useState(null);
//   const [day, setDay] = useState(null);

//   const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

//   useEffect(() => {
//     if (props.data !== null && props.day !== null) {
//       setForecastData(props.data.splice(0,6));
//       setDay(props.day);
//     }
//   }, [props.data, props.day]);

//   useEffect(() => {
//     if (forecastData !== null) {
//       return getDate();
//     } 
    
//   }, [forecastData, day]);

//   function getDate() {
//     if (forecastData === null) {
//       return;
//     }

//     let dateStr = new Date(forecastData[day].dt * 1000);
//     let dayOf = dateStr.getDay();
  
//     setDate(days[dayOf]);

//   }

// return (
//     <div className="DailyWeatherForecast">
//       {
//       forecastData !== null ? 
//         forecastData.map((dayOfWeek) => {
//          let dateStr = new Date(dayOfWeek.dt * 1000);
//          let dayOf = dateStr.getDay();

//         console.log(date)

//           return( 
//             <div>  
//               <div className="forecastDay">{date}</div>
//               <WeatherIcon code={forecastData[day].weather[0].icon} size={10}/>
//               <span className="forecastTemp-max">{Math.round(forecastData[day].main.temp_max)}°</span>
//               <span className="forecastTemp-min">{Math.round(forecastData[day].main.temp_min)}°</span>
//             </div>
//           )
//         })
//       : 
//       <></> 
//       }
//     </div>
//   );
// }