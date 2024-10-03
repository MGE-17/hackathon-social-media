import "./App.css";
import Comments from "./components/comments/comments";
import Image from "./components/image/image";

function App() {
  return (
    <section className="social">
      <div className="social__image"></div>
      <Image />
      <Comments />
    </section>
  );
}

export default App;
