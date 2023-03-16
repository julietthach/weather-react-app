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
  // const [unit, setUnit] = useState();
  const iconRef = useRef("");
  const forecastUrlRef = useRef("");
  const iconUrl = `http://openweathermap.org/img/wn/${iconRef.current}@2x.png`;

  function handleSubmit(event) {
    event.preventDefault();
    forecastUrlRef.current = `https://api.openweathermap.org/data/2.5/weather?q=${event.target.city.value}&units=metric&appid=2b6fdad0cbd018949c50c70f72250726`;
    axios.get(forecastUrlRef.current).then((response) => {
      setForecast(response.data);
      iconRef.current = response.data.weather[0].icon;
    });
  }

  // function convertTemperatureUnit(event) {
  //   event.preventDefault();
  //   console.log(unit)
  //   let fahrenheit = Math.round(props.temperature / (9 * 5) - 32);
  //   let celsius = Math.round(props.temperature * (9 / 5) + 32);
    
  // }

  return (
    <div className="WeatherWidget">
    <Container className="Search">
      <Form onSubmit={handleSubmit}>
      <Row>
            <Col md={8}><Form.Control input type="text" id="city" name="city" placeholder="Type a city.." /></Col>
            <Col sm={4}><Button variant="primary" input type="submit" value="Search">
            Search
            </Button>
            <Button variant="primary" type="submit">
            °F/°C
            </Button></Col>
          </Row>
      </Form>
    </Container>
    <Container className="Forecast">
      <ul>
        {forecast ? (
          <Row >
          <Col className="weather-temperature">
          <h2>City</h2>
            <li>
              <img src={iconUrl} alt="" />
            </li>
            <h1>{Math.round(forecast.main.temp)}°C</h1>
            </Col>
            <Col className="weather-description">
            <li>Description: {forecast.weather[0].description}</li>
            <li>Humidity: {forecast.main.humidity}%</li>
            <li>Wind: {forecast.wind.speed}km/h</li>
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