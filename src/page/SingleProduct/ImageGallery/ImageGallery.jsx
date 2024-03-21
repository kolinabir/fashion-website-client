import {useRef, useState, useEffect} from "react";
import "./ImageGallery.scss";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/scss/image-gallery.scss";

const Images = ({product}) => {
    // const toggleFullScreen = () => {
    //     if (!fullscreen) {
    //         // Enter fullscreen mode
    //         if (imageGalleryRef.current) {
    //             imageGalleryRef.current.requestFullscreen();
    //             setFullscreen(true);
    //         }
    //     } else {
    //         if (document.exitFullscreen) {
    //             document.exitFullscreen();
    //             setFullscreen(false);
    //         }
    //     }
    // };
    console.log(product);
    
    const images = [
        {
            original: `${product?.data?.image[0]}`,
            originalHeight: 1000,
            thumbnail: `${product?.data?.image[0]}`,
        },
        {
            original: `${product?.data?.image[1]}`,
            originalHeight: 600,
            
            thumbnail: `${product?.data?.image[1]}`,
        },
        {
            original: `${product?.data?.image[2]}`,
            originalHeight: 1000,
            thumbnail: `${product?.data?.image[2]}`,
        },
        {
            original: `${product?.data?.image[3]}`,
            originalHeight: 600,
            thumbnail: `${product?.data?.image[3]}`,
        },
    ];
    const imageGalleryRef = useRef(null);
    const [showNav, setShowNav] = useState(window.innerWidth < 1000);

    useEffect(() => {
        // Add an event listener for window resize
        const handleResize = () => {
            setShowNav(window.innerWidth < 1000);
        };

        window.addEventListener("resize", handleResize);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="image-gallery-container">
            <div ref={imageGalleryRef}>
                <ImageGallery
                    items={images}
                    
                    infinite={true}
                    showPlayButton={false}
                    showFullscreenButton={false}
                    lazyLoad={true}
                    showNav={showNav}
                    slideDuration={300}
                />
            </div>
        </div>
    );
};

export default Images;
