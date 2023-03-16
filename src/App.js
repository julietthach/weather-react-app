import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import WeatherApp from "./WeatherApp";

function App() {
  return (
    <div className="App">
      <WeatherApp />
      <small class="author"><a href="https://github.com/julietthach/weather-react-app" target="_blank" rel="noreferrer" >Open-source code</a>, by Thi Thach</small>
    </div>
  );
}

export default App;
