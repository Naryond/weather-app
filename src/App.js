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
        `${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
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
