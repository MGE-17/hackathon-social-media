// import deleteIcon from "../../assets/icons/icon-delete.svg";
import { epochToTimePassed } from "../../utils/helpers.jsx";
import "./Comments.scss";
import data from "./data.json";
import { useEffect } from "react";

export default function Comments() {
  //   const api = new brainflixAPI();

  const initialComments = data;

  initialComments.sort((a, b) => b.timestamp - a.timestamp);

  //   useEffect(() => {
  //     initialComments.sort((a, b) => b.timestamp - a.timestamp);
  //     setComments(initialComments);
  //   }, [initialComments]);

  if (!initialComments) return null; // Don't render anything if comments are not available

  //   async function deleteComment(commentId) {
  //     try {
  //       const response = await api.deleteComment(commentId, videoId);
  //       setComments((oldComments) =>
  //         oldComments.filter((comment) => comment.id !== commentId)
  //       );
  //     } catch (error) {
  //       console.error("Failed to load comments: ", error);
  //     }
  //   }

  return (
    <div className="post-container">
      {initialComments.map((item) => (
        <div className="post" key={item.id}>
          <div className="post__image"></div>
          <div className="post__content">
            <div className="post__text">
              <p className="post__name">{item.name}</p>
              <p className="post__comment">{item.comment}</p>
            </div>
            <p className="post__timestamp">
              {epochToTimePassed(item.timestamp)}
            </p>
            {/* <img
              className="post__delete"
              alt="Delete Comment"
              src={deleteIcon}
              onClick={() => {
                deleteComment(item.id);
              }}
            /> */}
          </div>
        </div>
      ))}
    </div>
  );
}
