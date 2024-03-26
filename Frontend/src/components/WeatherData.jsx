import { useEffect } from "react";
import "./weatherData.css";

function WeatherData({ city, currentData, setCurrentData }) {
  //function to make the backend request
  const getDataAPI = async (city) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_SERVER}${city}`);
      if (!response.ok) {
        if (response.status === 404) {
          alert("Sorry, couldn't find any matching city");
        } else if (response.status === 500) {
          alert("Sorry, we had a little problem with the server, please try again");
        }
      } else {
        const data = await response.json();
        setCurrentData(data.data);
      }
    } catch (err) {
      console.log(err);
      alert("An error occurred while fetching data. Please try again later.");
      setCurrentData(null);
    }
  };
  //calling the backend function
  const fetchData = async () => {
    console.log("starting to fetch")
    await getDataAPI(city);
  };
  //rendering the data every time a city  is entered
  useEffect(() => {
    if (city) {
      fetchData(city);
    }
  }, [city]);

  return (
    <>
      {!currentData ? null : (
        <div className="rightCon">
          <div className="dataCon">
            <div className="locationInfo smallCon">
              <h2>{currentData.city}</h2>
              <h3>{currentData.country}</h3>
              <h4 className="rowCon">
                <span>{currentData.currentTime}</span>
              </h4>
            </div>
            <div className="smallCon currentTempCon">
              <div className="bigTemp">{currentData.temp}°</div>
              <div className="rowCon">
                <div>{currentData.condition?.text}</div>
                <img
                  src={currentData.condition?.icon}
                  style={{ width: "30px" }}
                />
              </div>
            </div>
            <div className="extraCon">
              <div className="smallCon">
                <div className="extraHeader">precipitation</div>
                <div className="extraBottom">{currentData.precipitation}</div>
              </div>
              <div className="smallCon">
                <div className="extraHeader">humidity</div>
                <div className="extraBottom">{currentData.humidity}%</div>
              </div>
              <div className="smallCon">
                <div className="extraHeader">wind</div>
                <div className="extraBottom">
                  {currentData.wind?.speed} km/h To {currentData.wind?.dir}
                </div>
              </div>
            </div>
            <div className="header">Future forcast</div>
            <div className="extraCon">
              {currentData.future_temp?.map((current) => (
                <div className="smallCon" key={current.hour}>
                  <div className="extraHeader">{current.hour}:00</div>
                  <div className="extraBottom">{current.temp}°</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default WeatherData;
