import { useState } from "react";
import "./App.css";
import Image from "./components/image/Image";
import Comments from "./components/comments/Comments";

function App() {
  const [count, setCount] = useState(0);

  return (
    <section className="social">
      <Image />
      <Comments />
    </section>
  );
}

export default App;
