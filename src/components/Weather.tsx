import { useEffect } from "react";
import "./scss/weather.scss";

function Weather() {
  const APIkey = "13e50692f650e4663cbb5ad7302e4d31";

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((data) => {
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${data.coords.latitude}&lon=${data.coords.longitude}&appid=${APIkey}&units=metric`,
        { mode: "cors" }
      )
        .then((res) => {
          if (!res.ok) {
            throw Error("Weather data not available");
          }
          return res.json();
        })
        .then((data) => {
          (
            document.querySelector(".weather-icon") as HTMLImageElement
          ).src = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@4x.png`;
          (
            document.querySelector(".temperature") as HTMLImageElement
          ).textContent = `${Math.round(+data.list[0].main.temp)}°`;
          fetch(
            `https://api.openweathermap.org/geo/1.0/reverse?lat=55.6859392&lon=21.1484672&limit=5&appid=13e50692f650e4663cbb5ad7302e4d31`
          )
            .then((res) => {
              if (!res.ok) {
                throw Error("City not available");
              }
              return res.json();
            })
            .then((yourCity) => {
              (
                document.querySelector(".city") as HTMLImageElement
              ).textContent = yourCity[0].name;
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    });
  }, []);

  return (
    <div className="weather-wrapper">
      <div className="weather-top">
        <img src="" className="weather-icon" alt="weather icon" />
        <p className="temperature"></p>
      </div>
      <p className="city"></p>
    </div>
  );
}

export default Weather;
