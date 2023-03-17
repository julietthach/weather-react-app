import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import WeatherApp from "./WeatherApp";

function App() {
  return (
    <div className="App">
      <WeatherApp />
      <small className="footer">✌️ This website was coded by <a href="https://www.linkedin.com/in/thi-thach/" target="_blank" alt="" rel="noreferrer">Thi Thach</a>, and is <a href="https://github.com/julietthach/weather-react-app" target="_blank" rel="noreferrer" >open-sourced</a></small>
    </div>
  );
}

export default App;
