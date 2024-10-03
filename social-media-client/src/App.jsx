import "./App.scss";
import Comments from "./components/comments/comments";
import Image from "./components/image/image";

function App() {
  return (
    <section className="social">
      <h1 className="social__title">Social Media Site</h1>
      <div className="social__image">
        <Image />
        <Comments />
      </div>
    </section>
  );
}

export default App;
