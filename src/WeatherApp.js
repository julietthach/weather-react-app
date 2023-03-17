import "./App.css";
import React, { useState, useRef } from "react";
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function WeatherApp() {
  const [forecast, setForecast] = useState(null);
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [unit, setUnit] = useState("metric");
  const iconRef = useRef("");
  const forecastUrlRef = useRef("");
  const iconUrl = `http://openweathermap.org/img/wn/${iconRef.current}@2x.png`;

    // Get weather data from API, then set forecast
  function handleSubmit(event) {
    event.preventDefault();
    forecastUrlRef.current = `https://api.openweathermap.org/data/2.5/weather?q=${event.target.city.value}&units=metric&appid=2b6fdad0cbd018949c50c70f72250726`;
    axios.get(forecastUrlRef.current).then((response) => {
      iconRef.current = response.data.weather[0].icon;
      setForecast(response.data);
      setCity(response.data.name);
      
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
        <Button type="button" onClick={toggleUnit} className={unit === "metric" ? "metricButton" : "imperialButton"}>°C / °F</Button>
      </Col>
    </Row>
  </Form>
</Container>
    <Container className="Forecast">
      <ul>
        {forecast ? (
          <Row >
          <Col className="weather-temperature">
          <h2>{city}</h2>
            <li>
              <img src={iconUrl} alt="" />
            </li>
            <h1>{temperature}{unit === "metric" ? "°C" : "°F"}</h1>
            </Col>
            <Col className="weather-description">
            <li><h3>{(forecast.weather[0].description.charAt(0).toUpperCase() + forecast.weather[0].description.slice(1))}</h3></li>
            <li>Humidity: {forecast.main.humidity}%</li>
            <li>Wind: {windSpeed} {unit === 'metric' ? 'km/h' : 'mph' }</li>
            </Col>
            </Row>
        ) : (
          <></>
        )}
      </ul>
    </Container>
    </div>
    
  );
}