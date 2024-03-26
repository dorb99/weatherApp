require("dotenv").config({ path: "./.env" });
const { env } = require("process");
//function to make the date be in required format
const makingDate = (rawData) => {
  const localtime = new Date(rawData.location.localtime);
  const day = ("0" + localtime.getDate()).slice(-2);
  const month = ("0" + (localtime.getMonth() + 1)).slice(-2);
  const year = localtime.getFullYear();
  const roundedMinutes = Math.floor(localtime.getMinutes() / 10) * 10;
  const minutes = ("0" + (roundedMinutes < 60 ? roundedMinutes : 0)).slice(-2);
  const hours = ("0" + (roundedMinutes < 60 ? Math.round(localtime.getHours()) : Math.round(localtime.getHours())+1)).slice(-2);  
  const formattedDate = `${day}/${month}/${year} at ${hours}:${minutes}`;
  return formattedDate;
};
//retruning only the wanted data to the frontend
const gatherUsefulData = (rawData) => {
  const currentDate = makingDate(rawData);
  const data = {
    city: rawData.location.name,
    country: rawData.location.country,
    landitude: rawData.location.lat,
    longitude: rawData.location.lon,
    currentTime: currentDate,
    wind: { speed: rawData.current.wind_kph, dir: rawData.current.wind_dir },
    precipitation: rawData.current.precip_mm,
    humidity: rawData.current.humidity,
    lastUpdated: rawData.current.last_updated,
    temp: rawData.current.temp_c,
    condition: {
      text: rawData.current.condition.text,
      icon: rawData.current.condition.icon,
    },
    future_temp: [],
  };
  const currentHour = new Date(rawData.location.localtime).getHours();
  const hours = [
    currentHour - 1,
    currentHour,
    currentHour + 1,
    currentHour + 2,
    currentHour + 3,
  ];
  for (const hour of hours) {
    if (hour >= 0 && hour <= 23) {
      const forecast = rawData.forecast.forecastday[0].hour[hour];
      if (forecast) {
        data.future_temp.push({ hour: hour, temp: forecast.temp_c });
      }
    }
  }
  return data;
};

//the backend api function
exports.fetchData = async (req, res) => {
  const city = req.params.city;
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${env.WEATHER_API_KEY}&q=${city}&days=1&aqi=no&alerts=no`
    );
    const responseJSON = await response.json();
    if (responseJSON.error) {
      return res.status(404).json({ message: "City not found" });
    } else {
      const data = gatherUsefulData(responseJSON);
      return res.status(200).json({ message: "Data fetched", data: data });
    }
  } catch (err) {
    return res.status(500).send({ message: "Data fetched", error: err });
  }
};
