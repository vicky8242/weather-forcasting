import React, { useEffect, useState } from "react";
import languages from "./languages";
import creds from "./creds.json";
const Weather = () => {
  const [search, setSearch] = useState("delhi");
  const [input, setInput] = useState([]);
  const [cords, setCords] = useState({});
  const [hourly, setHourly] = useState([]);
  const [daily, setDaily] = useState([]);
  const [lang, setLang] = useState("en");
  const [base, setBase] = useState({});
  useEffect(() => {
    const fetchApi = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&lang=${lang}&appid=${creds.api}`;
      const respose = await fetch(url);
      const resJson = await respose.json();
      setBase(resJson);
      setCords(resJson.coord);
    };
    fetchApi();
  }, [search]);
  console.log(languages);
  const api = creds.api;
  const BASE_URL = "https://api.openweathermap.org/data/2.5/onecall?";

  useEffect(() => {
    const fetchApi = async () => {
      const url = `${BASE_URL}lat=${cords?.lat}&lon=${cords?.lon}&lang=${lang}&units=metric&appid=${api}`;
      const respose = await fetch(url);
      const resJson = await respose.json();
      console.log(resJson);
      setHourly(resJson.hourly);
      setDaily(resJson.daily);
    };
    fetchApi();
  }, [cords?.lat, cords?.lon]);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  function displayDay(d) {
    var date = new Date(d * 1000);
    return days[date.getDay()];
  }

  function displayDate(d) {
    var date = new Date(d * 1000);
    var years = date.getFullYear();
    var month = months[date.getMonth()];
    var day = date.getDate();
    var formattedDate = day + " " + month + " " + years;
    return formattedDate;
  }
  function displayTime(d) {
    var date = new Date(d * 1000);
    var hrs = date.getHours();
    var minutes = date.getMinutes();
    var formattedTime = hrs + ":" + minutes.toFixed();
    return formattedTime;
  }
  const handleSubmit = () => {
    setSearch(input);
    setInput("");
  };
  console.log(base);

  return (
    <>
      <div className="main-container">
        <div className=" heading-top">
          <h1> Weather Forcast</h1>
        </div>
        <div className="container">
          <div className="input-selector">
            <input
              className="search-input"
              type="text"
              value={input}
              placeholder="Search city name...."
              onChange={(e) => setInput(e.target.value)}
            ></input>
            <button onClick={handleSubmit} className="search-btn">
              Search
            </button>
            <select
              className="lang-select"
              onChange={(e) => setLang(e.target.value)}
            >
              <option className="lang-options">English</option>
              {languages.map((lang) => {
                return (
                  <option value={lang.code} className="lang-options">
                    {lang.name}
                  </option>
                );
              })}
            </select>
          </div>
          {!base.name ? (
            <div className="not-found">
              <h1>Please enter a valid city name</h1>
            </div>
          ) : (
            <div>
              <div className="day-time-div">
                <p>
                  {displayDate(base.dt)} | Local time :
                  {displayTime(new Date(base.dt).getTime())} |{" "}
                  {displayDay(base.dt)}
                </p>
              </div>

              <div className="city-name">
                <p>
                  {base.name},{base.sys?.country}
                </p>
              </div>
              <div className="description-div">
                <p> {base.weather && base?.weather[0]?.description}</p>
              </div>
              <div className="current-temp">
                <div>
                  <img
                    className="hourly-img"
                    src={
                      base?.weather &&
                      `https://openweathermap.org/img/wn/${base?.weather[0]?.icon}@2x.png`
                    }
                    alt="pic"
                  />
                </div>

                <div>
                  <p className="curr-temp-main">
                    {parseInt(base.main?.temp) - (273.15).toFixed()}°C
                  </p>
                </div>
                <div>
                  <p>
                    real feel:{" "}
                    <span className="feel-span">
                      {parseInt(base.main?.feels_like) - (273.15).toFixed()}
                      °C{" "}
                    </span>
                  </p>
                  <p>
                    Humidity :{" "}
                    <span className="humidity-span">
                      {base.main?.humidity.toFixed()}%{" "}
                    </span>{" "}
                  </p>
                  <p>
                    Wind :{" "}
                    <span className="wind-speed">
                      {" "}
                      {base.wind?.speed.toFixed()} km/h{" "}
                    </span>
                  </p>
                </div>
              </div>
              <div className="min-max-temp">
                <p>
                  sun rise:{displayTime(new Date(base.sys?.sunrise).getTime())}{" "}
                  | sun set:{displayTime(new Date(base.sys?.sunset).getTime())}{" "}
                  | high temp :
                  {parseInt(base.main?.temp_max) - (273.15).toFixed()}°C | low
                  temp :{parseInt(base.main?.temp_min) - (273.15).toFixed()}°C
                </p>
              </div>
              <div className="hourly-data-div">
                <h2 className="hourly-heading"> HOURLY FORCAST</h2>
                <hr />
                <div className="hourly-data-row-flex">
                  {hourly?.map((item) => {
                    return (
                      <div className="hourly-data-col-flex">
                        <p className="hourly-forcast-data">
                          {displayTime(new Date(item.dt).getTime())}
                        </p>
                        <p>
                          <img
                            className="hourly-img"
                            src={
                              item?.weather &&
                              `http://openweathermap.org/img/wn/${item.weather[0]?.icon}@2x.png`
                            }
                            alt="pic"
                          />
                        </p>
                        <h3>{parseInt(item.temp.toFixed())}°C</h3>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="hourly-data-div">
                <h2 className="hourly-heading"> DAILY FORCAST</h2>
                <hr />
                <div className="hourly-data-row-flex">
                  {daily?.map((elem) => {
                    return (
                      <div className="hourly-data-col-flex">
                        <p>{displayDay(elem.dt)}</p>
                        <div>
                          <img
                            className="hourly-img"
                            src={
                              elem?.weather &&
                              `http://openweathermap.org/img/wn/${elem.weather[0]?.icon}@2x.png`
                            }
                            alt="mmm"
                          />
                        </div>
                        <h3>{parseInt(elem.temp?.min.toFixed())}°C</h3>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Weather;
