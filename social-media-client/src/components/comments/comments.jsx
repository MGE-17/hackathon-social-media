// Comments.jsx
import { epochToTimePassed } from "../../utils/helpers.jsx";
import "./Comments.scss";
const placeholderAvatar = "https://placekitten.com/200/200"; // Use an image from placekittens

export default function Comments({ comments }) {
  return (
    <div className="post-container">
      {comments.map((item) => (
        <div className="post" key={item.id}>
          <div className="post__image">
            <img
              src={item.profile}
              alt={`${item.name}'s avatar`}
              onError={(e) => {
                e.target.onerror = null; // Prevent infinite loop if placeholder fails
                e.target.src = placeholderAvatar;
              }}
            />
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