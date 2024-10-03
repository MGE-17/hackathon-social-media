import "./Image.scss";
import Img from "../../assets/react.svg";

function Image() {
  return (
    <>
      <div className="image">
        <img src={Img} alt="display" />
      </div>
    </>
  );
}

export default Image;
