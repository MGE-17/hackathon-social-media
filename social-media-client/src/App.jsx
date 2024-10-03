import "./App.scss";
import Comments from "./components/comments/comments";
import CommentsContainer from "./components/CommentsContainer/CommentsContainer";
import Image from "./components/image/Image";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [comments, setComments] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageName, setImageName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch image and comments
  const fetchData = async () => {
    try {
      // Fetch the main image
      const imageResponse = await axios.get("http://localhost:3000/image");
      const { imageUrl, imageName } = imageResponse.data;
      setImageUrl(imageUrl);
      setImageName(imageName);

      // Fetch the comments
      const commentsResponse = await axios.get("http://localhost:3000/comments");
      setComments(commentsResponse.data);

      setLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load data.");
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch data on mount
    fetchData();

    // Set up interval to fetch data every 15 seconds
    const intervalId = setInterval(() => {
      fetchData();
    }, 15000); // 15000 milliseconds = 15 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="social">
      <h1 className="social__title">ChatterBox</h1>
      <div className="social__image">
        <Image imageUrl={imageUrl} imageName={imageName} />
        <Comments comments={comments} />
      </div>
      <CommentsContainer comments={comments} setComments={setComments} />
    </section>
  );
}

export default App;