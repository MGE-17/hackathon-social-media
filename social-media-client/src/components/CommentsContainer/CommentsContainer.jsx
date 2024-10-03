// CommentsContainer.jsx
import "./CommentsContainer.scss";
import mohan from "../../assets/Images/Mohan-muruge.jpg";
import Comments from "../comments/comments";
import { useEffect, useState } from "react";
import axios from "axios";

function CommentsContainer() {
  const [name, setName] = useState(""); // Holds the name input value
  const [comment, setComment] = useState(""); // Holds the comment input value
  const [loading, setLoading] = useState(true); // Indicates if comments are being loaded
  const [error, setError] = useState(null); // Holds any error messages

  // Handler for form submission to add a new comment
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form inputs
    if (name.trim() === "" || comment.trim() === "") {
      alert("Please fill in both fields.");
      return;
    }

    const newComment = {
      id: Date.now().toString(), // Ideally, the backend assigns IDs
      name: name.trim(),
      comment: comment.trim(),
      timestamp: Date.now(),
    };

    try {
      // Send the new comment to the backend
      const response = await axios.post(
        "http://localhost:3000/comments",
        newComment
      );
      console.log("Posted new comment:", response.data); // Debugging log

      // Update the local state to include the new comment
      setComments((prevComments) => [response.data, ...prevComments]);

      // Clear form fields
      setName("");
      setComment("");
    } catch (err) {
      console.error("Error posting comment:", err);
      alert("Failed to post comment. Please try again.");
    }
  };

  // Render loading state
  if (loading) return <div>Loading comments...</div>;

  // Render error state
  if (error) return <div>{error}</div>;

  if (comments)
    return (
      <div className="conversation__container">
        <div className="comments">
          <img src={mohan} alt="comments avatar" className="comments__image" />
          <form className="comments__form" onSubmit={handleSubmit}>
            <div className="comments__name">
              <label htmlFor="name" className="comments__label">
                NAME
              </label>
              <input
                type="text"
                className="comments__input"
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="comments__comment">
              <label htmlFor="comment" className="comments__label">
                COMMENT
              </label>
              <textarea
                className="comments__input"
                id="comment"
                placeholder="Add a new comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </div>
            <button type="submit" className="comments__button button">
              COMMENT
            </button>
          </form>
        </div>
      </div>
    );
}

export default CommentsContainer;
