import "./App.css";
import CommentsContainer from "./components/CommentsContainer/CommentsContainer";
import Image from "./components/image/image";

function App() {
  return (
    <section className="social">
      <div className="social__image"></div>
      <Image />
      <CommentsContainer />
    </section>
  );
}

export default App;
