import "./App.scss";
import CommentsContainer from "./components/CommentsContainer/CommentsContainer";
import Image from "./components/image/image";

function App() {
  return (
    <section className="social">
      <h1 className="social__title">Social Media Site</h1>
      <div className="social__image">
        <Image />
        <CommentsContainer />
      </div>
    </section>
  );
}

export default App;
