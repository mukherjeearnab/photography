import Gallery from "react-grid-gallery";

import "./css/GalleryContent.css";

const Component = (props) => {
    return (
        <div className="gallery-content">
            <h1>Photo Gallery</h1>
            <Gallery images={props.images} enableLightbox={true} enableImageSelection={false} />
        </div>
    );
};

export default Component;
