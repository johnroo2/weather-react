import React from "react";
import "./App.css";
import LocationSearch from "./components/locationSearch";
import {retrieve} from "./processes/weather-retrieve";
import {convert} from "./processes/weather-convert";

function App() {
  const [weather, setWeather] = React.useState(null);

  React.useEffect(() => {retrieve(
    
    navigator.geolocation.getCurrentPosition(position => {
      return {lat: position.coords.latitude, long: position.coords.longitude}
    })

    ).then((result) => {
    setWeather(convert(result));
  })}, []);

  return (
    <>
      <div>
        <LocationSearch setWeather={setWeather}/>
      </div>
      <div className="App">
        <header className="App-header">
          <div className= "jost">
          {weather &&
            <>
            <p className="header"><b>{weather.loc}</b></p>
            <p className="para-white">Retrieved on {weather.retrieved}</p>
            <div className="weather-center">
              <p className="weather-main"><b>{weather.temp}</b></p>
              <div className="feelslike">
                <p className="para-white"><i>Feels</i></p>
                <p className="para-white"><i>Like</i></p>
              </div>
              <p className="weather-sub">{weather.temp_fl}</p>
              <img className="weather-img" alt="silly" src={require("./imgs/yikes.png")}></img>
            </div>
            <p className="para-white">{weather.wtype}</p>
            <p className="para-white"><br></br></p>
            <div className="container">
              <div className="subcontainer">
                  <p className="para-blue">Wind</p>
                  <p className="para-white">{weather.wind}</p>
              </div>
              <div className="subcontainer">
                  <p className="para-blue">Wind Gust</p>
                  <p className="para-white">{weather.wind_gust}</p>
              </div>
              <div className="subcontainer">
                  <p className="para-blue">Humidity</p>
                  <p className="para-white">{weather.humidity}</p>
              </div>
              <div className="subcontainer">
                  <p className="para-blue">Pressure</p>
                  <p className="para-white">{weather.pressure}</p>
              </div>
              <div className="subcontainer">
                  <p className="para-blue">Visibility</p>
                  <p className="para-white">{weather.visibility}</p>
              </div>
              <div className="subcontainer">
                  <p className="para-blue">Sunrise</p>
                  <p className="para-white">{weather.sunrise}</p>
              </div>
              <div className="subcontainer">
                  <p className="para-blue">Sunset</p>
                  <p className="para-white">{weather.sunset}</p>
              </div>
            </div></>}
          
          {!weather &&
          <><p className="header" style={{textAlign:"center"}}><b>Loading information...</b></p></>}
          </div>
        </header>
      </div>
    </>
  );
}

export default App;