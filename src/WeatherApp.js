import "./styles.css";
import React, { useState, useRef } from "react";
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function WeatherApp() {
  const [forecast, setForecast] = useState(null);
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
          <Col>
            <li>
              <img src={iconUrl} alt="" />
            </li>
            <li>Temperature: {Math.round(forecast.main.temp)}°C</li>
            </Col>
            <Col>
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

//     <Container className="Forecast">
//       <Row>
//         <Col>
//           <h2 className="city">Toronto</h2>
//           <img className="icon" src={cloudImage} alt="" />
//           <h1>20</h1>
//         </Col>
//         <Col>
//           <ul>
//             <li>Description:</li>
//             <li>Humidity:</li>
//             <li>Wind:</li>
//           </ul>
//         </Col>
//       </Row>
//     </Container>
//     </div>  


//   );
// } */}
