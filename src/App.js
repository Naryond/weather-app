import './App.css';
import '../src/styles.css';
import React, { useEffect, useState } from 'react';
import Weather from './components/weather';
import { Dimmer, Loader } from 'semantic-ui-react';

const App = () => {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setTimeout(() => {
        navigator.geolocation.getCurrentPosition(async (position) => {
          setLat(position.coords.latitude);
          setLong(position.coords.longitude);
        });
      }, 1000);
      fetch(
        `https://api.openweathermap.org/data/2.5/weather/?lat=${lat}&lon=${long}&units=metric&APPID=c4adc023cc385bae04ed7658224c9c24`
      )
        .then((res) => res.json())
        .then((result) => {
          setData(result);
        });
    };

    fetchData();
  }, [lat, long]);

  return (
    <div className="App">
      {typeof data.main != 'undefined' ? (
        <Weather weatherData={data} />
      ) : (
        <div>
          <Dimmer active>
            <Loader>Loading..</Loader>
          </Dimmer>
        </div>
      )}
    </div>
  );
};

export default App;
