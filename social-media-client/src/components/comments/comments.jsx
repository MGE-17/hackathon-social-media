// Comments.jsx
import { useEffect, useState } from "react";
import { epochToTimePassed } from "../../utils/helpers.jsx";
import "./Comments.scss";
import axios from "axios";

export default function Comments() {
  const [comments, setComments] = useState([]); // Holds the list of comments
  const [loading, setLoading] = useState(true); // Indicates if comments are being loaded
  const [error, setError] = useState(null); // Holds any error messages

  // Function to fetch comments from the API
  const fetchComments = async () => {
    try {
      const response = await axios.get("http://localhost:3000/comments");
      console.log("Fetched comments:", response.data); // Debugging log
      // Sort comments by timestamp in descending order
      const sortedComments = response.data.sort(
        (a, b) => b.timestamp - a.timestamp
      );
      setComments(sortedComments);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching comments:", err);
      setError("Failed to load comments.");
      setLoading(false);
    }
  };

  // Fetch comments when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      await fetchComments();
    };
    fetchData();
  }, []);

  return (
    <div className="post-container">
      {comments.map((item) => (
        <div className="post" key={item.id}>
          <div className="post__image">
            {/* Placeholder for user avatar or image */}
            {/* Example: <img src={item.avatar} alt={`${item.name}'s avatar`} /> */}
          </div>
          <div className="post__content">
            <div className="post__text">
              <p className="post__name">{item.name}</p>
              <p className="post__comment">{item.comment}</p>
            </div>
            <p className="post__timestamp">
              {epochToTimePassed(item.timestamp)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
