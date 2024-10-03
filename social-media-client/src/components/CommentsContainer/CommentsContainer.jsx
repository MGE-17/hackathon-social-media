import "./CommentsContainer.scss";
import mohan from "../../assets/Images/Mohan-muruge.jpg";
import Comments from "../comments/comments";

function CommentsContainer() {
  return (
    <div className="conversation__container">
      <div className="comments">
        <img src={mohan} alt="comments image" className="comments__image" />
        <form className="comments__form">
          <div className="comments__name">
            <label className="comments__label">NAME</label>
            <input
              type="text"
              className="comments__input"
              id="name"
              placeholder="Enter your name"
            />
          </div>
          <div className="comments__comment">
            <label className="comments__label">COMMENT</label>
            <textarea
              type="text"
              className="comments__input"
              id="comment"
              placeholder="Add a new comment"
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
