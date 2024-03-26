import './App.css'
import WeatherData from './components/WeatherData'
import SearchSide from './components/SearchSide'
import { useState } from 'react';

function App() {
  const [city, setCity] = useState();
  const [currentData, setCurrentData] = useState();

  return (
    <div className='bigCon'>
      <SearchSide setCity={setCity} currentData={currentData} setCurrentData={setCurrentData}/>
      {city ? <WeatherData city={city} currentData={currentData} setCurrentData={setCurrentData}/> : null}
    </div>
  )
}

export default App
