import "./image.scss";
import socialData from "../../../../social-media-backend/data/images/beach-tunnel.jpg";

function Image() {
  const imageSrc = socialData[0].image;

  return (
    <>
      <div className="image">
        <img src={socialData} alt="social-media-image" />
      </div>
    </>
  );
}

export default Image;
