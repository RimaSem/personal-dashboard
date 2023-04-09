import { useState, useEffect } from "react";
import bg from "./assets/placeholder_img.jpeg";
import dogecoinIcon from "./assets/dogecoin-icon.png";
import todoListIcon from "./assets/todo-list-icon.png";
import "./App.scss";

function App() {
  const [time, setTime] = useState(new Date());
  const APIkey = "13e50692f650e4663cbb5ad7302e4d31";

  // Refresh current time at interval of 1 second
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Get background image and image author
  useEffect(() => {
    (
      document.querySelector(".App") as HTMLElement
    ).style.backgroundImage = `url(${bg})`;
    (
      document.querySelector(".img-author") as HTMLDivElement
    ).textContent = `Image author: Jane Doe`;

    // fetch(
    //   "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
    // )
    //   .then((res) => res.json())
    //   .then((data) => {
    //     (
    //       document.querySelector(".App") as HTMLElement
    //     ).style.backgroundImage = `url(${data.urls.regular})`;
    //     (
    //       document.querySelector(".img-author") as HTMLDivElement
    //     ).textContent = `Image author: ${data.user.name}`;
    //   });
  }, []);

  // Get crypto data
  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
      .then((res) => {
        if (!res.ok) {
          throw Error("Oh no... something went wrong");
        }
        return res.json();
      })
      .then((data) => {
        (
          document.querySelector(".dogecoin-current") as HTMLElement
        ).textContent = "🎯 €" + data.market_data.current_price.eur;
        (
          document.querySelector(".dogecoin-highest") as HTMLElement
        ).textContent = "👆 €" + data.market_data.high_24h.eur;
        (
          document.querySelector(".dogecoin-lowest") as HTMLElement
        ).textContent = "👇 €" + data.market_data.low_24h.eur;
      })
      .catch((err) => {
        console.log(err);
        (document.querySelector(".dogecoin-name") as HTMLElement).textContent =
          "Currently not available";
      });
  }, []);

  // Get weather and city data
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
          console.log(data);
          (
            document.querySelector(".weather-icon") as HTMLImageElement
          ).src = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@4x.png`;
          (
            document.querySelector(".temperature") as HTMLImageElement
          ).textContent = `${Math.round(+data.list[0].main.temp)}°`;
          fetch(
            `http://api.openweathermap.org/geo/1.0/reverse?lat=55.6859392&lon=21.1484672&limit=5&appid=13e50692f650e4663cbb5ad7302e4d31`
          )
            .then((res) => {
              if (!res.ok) {
                throw Error("City not available");
              }
              return res.json();
            })
            .then(
              (yourCity) =>
                ((
                  document.querySelector(".city") as HTMLImageElement
                ).textContent = yourCity[0].name)
            )
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    });
  }, []);

  return (
    <div className="App">
      <div className="crypto-weather-container">
        <div className="crypto-wrapper">
          <div className="crypto-top-section">
            <img
              className="dogecoin-img"
              src={dogecoinIcon}
              alt="dogecoin logo"
            />
            <p className="dogecoin-name">Dogecoin</p>
          </div>
          <p className="price dogecoin-current"></p>
          <p className="price dogecoin-highest"></p>
          <p className="price dogecoin-lowest"></p>
        </div>
        <div className="weather-wrapper">
          <div className="weather-top">
            <img src="" className="weather-icon" alt="weather icon" />
            <p className="temperature"></p>
          </div>
          <p className="city"></p>
        </div>
      </div>
      <div className="mid-section">
        <h1>
          {time.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </h1>
        <input
          className="search"
          name="search"
          placeholder="Search Google"
        ></input>
      </div>
      <div className="bottom-section">
        <div className="img-author">Image author: Jane Doe</div>
        <a href="https://rimasem.github.io/todo-list/" target="_blank">
          <img
            className="todo-list-icon"
            src={todoListIcon}
            alt="todo list icon"
          />
        </a>
      </div>
    </div>
  );
}

export default App;
