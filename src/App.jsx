import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import Loader from './components/Loader'
import WeatherCard from './components/WeatherCard'

const API_KEY = "4b6651d8082b35120ef170fedd82020d"

function App() {
  
  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState();
  const [temps, setTemps] = useState();
  const [isCelsius, setIsCelsius] = useState(true);

  const succes = (e) => {
    console.log(e)
    const newCoords = {
      lat: e.coords.latitude,
      lon: e.coords.longitude
    }
    setCoords(newCoords)
  }

  const changeUniteTemp = () => setIsCelsius(!isCelsius)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(succes)
  }, [])
  
  useEffect(() => {
    if(coords){
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`
      axios.get(URL)
        .then(res => {
          setTimeout(() => { 
          setWeather(res.data)
          const celsius = (res.data.main.temp - 273.15).toFixed(2);
          const farenheit = (celsius * (9/5) + 32).toFixed(2);
          const newTemps = { celsius, farenheit }
          setTemps(newTemps)
          }, 1000)
        })
        .catch(err => console.log(err))
    }
  }, [coords])
  
  return (
    <div className='App'>

      {
        weather ? (
      <WeatherCard 
        weather={weather} 
        temps={temps} 
        isCelsius={isCelsius} 
        changeUniteTemp={changeUniteTemp}
        />
      ) : <Loader/>
    }
    </div>
  )
}

export default App
