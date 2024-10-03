import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <section className="social">
      <div className="social__image"></div>
      <div className="social__comments"></div>
    </section>
  );
}

export default App;
