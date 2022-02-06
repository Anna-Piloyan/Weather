import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import axios from 'axios';

function App() {

  const [city, setCity] = useState('');
  const [weather, setWeather] = useState({});


  const search = evt => {
    if (evt.key === 'Enter') {
      axios.get(`${process.env.REACT_APP_BASE}weather?q=${city}&units=metric&appid=${process.env.REACT_APP_KEY}`) // отправляем запрос
        .then(res => {
          const result = res.data;
          setWeather(result);
          setCity('');
          console.log(result);
        });
    }
  }


  const format_date = (d) => {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Oktober', 'November', 'December'];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div>
      <main>
        <div className='search-box'>
          <input
            type='text'
            className='search-bar'
            placeholder='Поиск...'
            onChange={e => setCity(e.target.value)}
            value={city}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != 'undefined') ? (
          <div className="card1">
            <div className='weather-box'>
              <div className='temp  d-flex'>
                {Math.round(weather.main.temp)}°c
                <div className='app'>
                  <img src={`http://openweathermap.org/img/wn/${weather.weather[0]["icon"]}@2x.png`}></img>
                </div>
              </div>
              <div className='location-box'>
                <div className='location'>{weather.name}, {weather.sys.country}</div>
                <div className='date'>{format_date(new Date())}</div>
              </div>
              <div className='weather'>{weather.weather[0].main}</div>
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
