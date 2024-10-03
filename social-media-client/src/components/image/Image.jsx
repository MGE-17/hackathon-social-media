import "./image.scss";
import socialData from "../../data/socialData.json";

function Image() {
  const imageSrc = socialData[0].image;

  return (
    <>
      <div className="image">
        <img src={imageSrc} alt="social-media-image" />
      </div>
    </>
  );
}

export default Image;
