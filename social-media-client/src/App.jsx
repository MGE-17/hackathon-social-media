import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Comments from "./components/comments/comments";

function App() {
  const [count, setCount] = useState(0);

  return (
    <section className="social">
      <div className="social__image"></div>
      <Comments />
    </section>
  );
}

export default App;
