import { useState, useEffect } from "react";
import bg from "./assets/placeholder_img.jpeg";
import "./App.scss";

function App() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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

  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
      .then((res) => {
        if (!res.ok) {
          throw Error("Oh no... something went wrong");
        }
        return res.json();
      })
      .then((data) => {
        (document.querySelector(".dogecoin-img") as HTMLImageElement).src =
          data.image.small;
        (document.querySelector(".dogecoin-name") as HTMLElement).textContent =
          data.name;
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

  return (
    <div className="App">
      <div className="crypto-weather-container">
        <div className="crypto-wrapper">
          <div className="crypto-top-section">
            <img className="dogecoin-img" src="" alt="dogecoin logo" />
            <p className="dogecoin-name"></p>
          </div>
          <p className="price dogecoin-current"></p>
          <p className="price dogecoin-highest"></p>
          <p className="price dogecoin-lowest"></p>
        </div>
        <p>Weather</p>
      </div>
      <h1>
        {time.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
      </h1>
      <div className="img-author">Image author: Jane Doe</div>
    </div>
  );
}

export default App;
