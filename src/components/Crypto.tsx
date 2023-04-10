import { useEffect } from "react";
import dogecoinIcon from "../assets/dogecoin-icon.png";
import "./scss/crypto.scss";

function Crypto() {
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

  return (
    <div className="crypto-wrapper">
      <div className="crypto-top-section">
        <img className="dogecoin-img" src={dogecoinIcon} alt="dogecoin logo" />
        <p className="dogecoin-name">Dogecoin</p>
      </div>
      <p className="price dogecoin-current"></p>
      <p className="price dogecoin-highest"></p>
      <p className="price dogecoin-lowest"></p>
    </div>
  );
}

export default Crypto;
