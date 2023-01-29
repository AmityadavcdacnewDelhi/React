import React, {useState, useEffect} from 'react';
import axios  from "axios";
import {weatherForecast} from './Api'

import "./App.css";

function App() {
  const [state, setState] = useState({
    value: '',
    current: {
    },
    weekInfo: [],
    error: false,
  })

  useEffect(() => {
    handleSearchCity();
  }, []);

  const handleSearchCity = e => {
    axios.get(weatherForecast("London, England"))
    .then(response => {
      const data = response.data
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'Nocvember',
        'December',
      ]

      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      const currentDate = new Date()
      const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${
        months[currentDate.getMonth()]
      }`;

      const sunset = new Date(data.list[0].sunset * 1000).toLocaleTimeString().slice(0, 4)
      const sunrise = new Date(data.list[0].sunrise * 1000).toLocaleTimeString().slice(0, 4)

      const current = {
        city: data.city.name,
        country: data.city.country,
        date,
        population: data.city.population,
        desc: data.list[0].weather[0].description,
        main: data.list[0].weather[0].main,
        icon: data.list[0].weather[0].icon,
        temp: data.list[0].temp.day,
        hTemp: data.list[0].temp.max,
        lTemp: data.list[0].temp.min,
        sunrise,
        sunset,
        clouds: data.list[0].clouds,
        humidity: data.list[0].humidity,
        wind: data.list[0].speed,
        pressure: data.list[0].pressure,
      }

      const weekData = data.list
      const weekInfo = weekData.map((data, index) => {
        return{
          key:index,
          main: data.weather[0].main,
          day: new Date(data.dt * 1000).toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).slice(0,3),
          desc: data.weather[0].description,
          icon: data.weather[0].icon,
          hTemp: data.temp.max,
          lTemp: data.temp.min,
        }})

      setState({
        ...state,
        current,
        weekInfo,
        loading: false,
        error: false,
      })
      
      })
      .catch(error => {
        console.log(error);

        setState({
          ...state,
          loading: false,
          error: true,
          current: {},
          weekInfo: [],
        })
      })
    }

    const today = state.current;
  return (
    <div className="App">
      <center>
        <div className="parent_container">
          <div className="p1">
          <div >
                <div >
                    <img src={`https://openweathermap.org/img/w/${today.icon}.png`} alt={today.icon} />
                    <p >
                        {today.temp}°C
                    </p>
                    <p variant="h6" gutterBottom>
                        {today.main}, {today.desc}
                    </p>
                </div>
                {/* <div >
                    
                    <p variant="h6"gutterBottom >
                       <img src={sunrise} alt="Logo" /> {today.sunrise} A.M.
                    </p>
                    <p variant="h6"gutterBottom >
                        <img src={sunset} alt="Logo"/> {today.sunset} P.M.
                    </p>
                    
                </div> */}
            </div>
                {/* <div>
                    <img src={pressure} alt="Logo" /><span >{today.pressure} hPa</span>
                    <img src={humidity} alt="Logo" /><span >{today.humidity} %</span>
                    <img src={wind_speed} alt="Logo" /><span >{today.wind} m/s N</span>
                </div> */}
          </div>
          <div className="p2">
           
              {state.weekInfo.map((data) => (
                 <div className="c1">
                <h5>
                  {data.day}
                </h5> 
              <img
                src={`https://openweathermap.org/img/w/${data.icon}.png`}
                alt={data.icon}
              />
              <p>
                {data.lTemp}°C - {data.hTemp}°C
              </p>
              <p>
                {data.main},
              </p>
              <h4 style={{fontWeight: 'bold', paddingBottom: '10px'}}>{data.desc}</h4>
            </div>
        ))}
          </div>
        </div>
      </center>
    </div>
  );
}

export default App;
