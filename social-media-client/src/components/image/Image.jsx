import "./image.scss";

export default function Image({ imageUrl, imageName }) {
  if (!imageUrl) {
    return <div>Loading image...</div>;
  }

  return (
    <div className="image-container">
      <img src={imageUrl} alt={imageName} className="main-image" />
      <p className="image__name">{imageName}</p>
    </div>
  );
}