import { useState } from "react";
import "./searchSide.css";

function SearchSide({ setCity, currentData, setCurrentData }) {
  const [currentSearch, setCurrentSearch] = useState("");

  //making sure the input is valid
  const authorizeCityName = (cityName) => {
    const regex = /^[A-Za-z]+(?:\s+[A-Za-z]+)*$/;
    return regex.test(cityName);
  };

  //handling the submit button
  const handleSubmit = (e) => {
    e.preventDefault();
    if (authorizeCityName(currentSearch)) {
      setCity(currentSearch);
    } else {
      alert("Please enter real city");
    }
  };

  return (
    <>
      <div className="leftCon">
        <div className="icon">
          <img src="fintekIcon.png" style={{ width: "120px" }}></img>
        </div>
        <div className="searchCon">
          <p className="pHeader">
            Use our weather app to see the weather around the world
          </p>
          <div className="inputCon">
            <div className="beforeInput">City name</div>
            <form onSubmit={handleSubmit} className="formCon">
              <input
                type="text"
                placeholder="Find a city"
                onChange={(e) => setCurrentSearch(e.target.value)}
                value={currentSearch}
              />
              <button type="submit">Check</button>
            </form>
          </div>
        </div>
        {!currentData ? null : (
          <div className="searchFooter">
            <div className="smallText">
              latitude {currentData.landitude} <br />
              longitude {currentData.longitude}
            </div>
            <div className="smallText">
              accurate to <br />
              {currentData.lastUpdated}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default SearchSide;
