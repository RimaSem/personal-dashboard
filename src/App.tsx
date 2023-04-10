import { useState, useEffect, useRef, KeyboardEvent } from "react";
import bg from "./assets/placeholder_img.jpeg";
import todoListIcon from "./assets/todo-list-icon.png";
import { Icon } from "@mdi/react";
import { mdiMagnify } from "@mdi/js";
import "./App.scss";
import Crypto from "./components/Crypto";
import Weather from "./components/Weather";

function App() {
  const [time, setTime] = useState(new Date());
  const [loaded, setLoaded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Refresh current time at interval of 1 second
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Get background image and image author
  useEffect(() => {
    fetch(
      "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("Oh no... something went wrong");
        }
        return res.json();
      })
      .then((data) => {
        (
          document.querySelector(".container") as HTMLElement
        ).style.backgroundImage = `url(${data.urls.full})`;
        (
          document.querySelector(".img-author") as HTMLDivElement
        ).textContent = `Image author: ${data.user.name}`;
      })
      .then((data) => {
        setTimeout(() => {
          setLoaded(true);
        }, 1500);
      })
      .catch((err) => {
        (
          document.querySelector(".container") as HTMLElement
        ).style.backgroundImage = `url(${bg})`;
        console.log(err);
        setTimeout(() => {
          setLoaded(true);
        }, 1500);
      });
  }, []);

  function handleSearch(e: KeyboardEvent) {
    if (e.key === "Enter" && inputRef.current) {
      window.open("https://www.google.com/search?q=" + inputRef.current.value);
    }
  }

  return (
    <div className="App">
      {!loaded && <div className="loader">Loading...</div>}
      <div className="container">
        <div className="crypto-weather-container">
          <Crypto />
          <Weather />
        </div>
        <div className="mid-section">
          <h1>
            {time.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </h1>
          <div className="search-wrapper">
            <input
              ref={inputRef}
              onKeyDown={handleSearch}
              className="search"
              name="search"
              placeholder="Search Google"
              autoFocus
            />
            <div
              className="icon-wrapper"
              onClick={() => {
                if (inputRef.current) {
                  window.open(
                    "https://www.google.com/search?q=" + inputRef.current.value
                  );
                }
              }}
            >
              <Icon className="search-icon" path={mdiMagnify} />
            </div>
          </div>
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
    </div>
  );
}

export default App;
