import { useState, useEffect } from "react";
import "./App.scss";

function App() {
  useEffect(() => {
    fetch(
      "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
    )
      .then((res) => res.json())
      .then(
        (data) =>
          ((
            document.querySelector(".App") as HTMLElement
          ).style.backgroundImage = `url(${data.urls.full})`)
      );
  }, []);

  return <div className="App"></div>;
}

export default App;
