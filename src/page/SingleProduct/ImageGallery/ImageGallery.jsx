import { useRef, useState, useEffect } from "react";
import "./ImageGallery.scss";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/scss/image-gallery.scss";

const Images = ({ product }) => {
  console.log(product);

  const images = product?.image?.map((image) => ({
    original: image,
    thumbnail: image,
  }));

  const imageGalleryRef = useRef(null);
  const [showNav, setShowNav] = useState(window.innerWidth < 1000);

  useEffect(() => {
    const handleResize = () => {
      setShowNav(window.innerWidth < 1000);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const customStyles = `
    .custom-image-gallery img {
      object-fit: contain;
      max-height: 600px; // or whatever height you desire
    }
  `;

  return (
    <div className="image-gallery-container">
      <style>{customStyles}</style>
      <div ref={imageGalleryRef} className="custom-image-gallery">
        <ImageGallery
          items={images}
          infinite={true}
          showPlayButton={false}
          showFullscreenButton={false}
          lazyLoad={true}
          showNav={showNav}
          slideDuration={300}
          onErrorImageURL="https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg"
        />
      </div>
    </div>
  );
};

export default Images;
