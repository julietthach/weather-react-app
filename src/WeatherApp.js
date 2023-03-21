import "./App.css";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import FormattedDate from "./FormattedDate"
import WeatherForecastDay from "./WeatherForecastDay"
import WeatherIcon from "./WeatherIcon"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function WeatherApp() {
  const [forecast, setForecast] = useState(null);
  const [dailyForecast, setDailyForecast] = useState(null);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [unit, setUnit] = useState("metric");
  let iconRef = useRef("");
  let forecastUrlRef = useRef("");
  const apiKey = `bf54175800a55e59e6c4d6461deeef12`

  useEffect(() => {
    if (city !== "") {
      let dailyForecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=metric`;
      axios.get(dailyForecastUrl).then((response) => {
        setDailyForecast(response.data.daily);
      });

    }
    
  }, [coordinates, city, apiKey]);

    // Get weather data from API, then set forecast
  function handleSubmit(event) {
    event.preventDefault();
    forecastUrlRef.current = `https://api.openweathermap.org/data/2.5/weather?q=${event.target.city.value}&units=metric&appid=${apiKey}`;
    axios.get(forecastUrlRef.current).then((response) => {
      iconRef.current = response.data.weather[0].icon;
      setForecast(response.data);
      setCity(response.data.name);
      setCountry(response.data.sys.country);
      setCoordinates(response.data.coord);
      
      // If unit is imperial, set temperature to fahrenheit, and set wind speed unit to mph
      if (unit === "imperial") {
      setTemperature(Math.round((response.data.main.temp * 9/5) + 32));
      return setWindSpeed(Math.round(response.data.wind.speed * 0.609344))

      }
      // If unit is metric, set temperature to celsius, and set wind speed unit to km/h
      setTemperature(Math.round(response.data.main.temp));
      setWindSpeed(Math.round(response.data.wind.speed))

    });
  }

  function toggleUnit () {
    let metricTemp = Math.round(forecast.main.temp);
    let imperialTemp = Math.round((forecast.main.temp * 9/5) + 32);
    let metricWind = Math.round(forecast.wind.speed);
    let imperialWind = Math.round(forecast.wind.speed * 0.609344
      );
 
    if (unit === "metric") {
      setUnit("imperial");
      setTemperature(imperialTemp);
      setWindSpeed(imperialWind)
      return;
    }

    setUnit("metric");
    setTemperature(metricTemp);
    setWindSpeed(metricWind)
  }



  return (
    <div className="WeatherWidget">
<Container className="Search">
  <Form onSubmit={handleSubmit}>
    <Row>
      <Col md={7}>
        <Form.Control input type="text" id="city" name="city" placeholder="Type a city.." />
      </Col>
      <Col md={5}>
        <Button input type="submit" value="Search" className="searchButton">Search</Button>
        <Button type="button" onClick={toggleUnit} className={unit === "metric" ? "metricButton" : "imperialButton"}>Change Unit</Button>
      </Col>
    </Row>
  </Form>
</Container>
    
        {forecast ? (
          <Container className="Forecast">
          <Row className="locationDetails"><ul>
          <li className="location">{city}, {country}</li>
          <li className="Date"><FormattedDate date={new Date(forecast.dt * 1000)}/></li>
          <li className="text-capitalize">{forecast.weather[0].description}</li>
          </ul></Row>
          <Row className="weatherDetails">
            <Col xs={2}>
              <WeatherIcon code={iconRef.current} />
            </Col>
            <Col xs={5}>
            <span className="temperature">{temperature}{unit === "metric" ? "°C" : "°F"}</span>
            </Col>
            <Col>
            <ul>
            <li>Humidity: {forecast.main.humidity}%</li>
            <li>Wind: {windSpeed} {unit === 'metric' ? 'km/h' : 'mph' }</li></ul>
            </Col>
          </Row>
          <Row className="forecastDetails">
            {dailyForecast !== null ? 
            <>
              
              <Col><WeatherForecastDay data={dailyForecast[1]}/></Col>
              <Col><WeatherForecastDay data={dailyForecast[2]}/></Col>
              <Col><WeatherForecastDay data={dailyForecast[3]}/></Col>
              <Col><WeatherForecastDay data={dailyForecast[4]}/></Col>
              <Col><WeatherForecastDay data={dailyForecast[5]}/></Col>
            </>
            : 
            <></>
            }
         
          </Row>
          </Container>
        ) : (
          <></>
        )}

    </div>
    
  );
}