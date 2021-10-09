import { useState, useEffect } from "react";
import FullSlide from "../components/FullSlide";
import GalleryContent from "../components/GalleryContent";

const Page = () => {
    const [image, setImage] = useState([]);

    useEffect(() => {
        // GET QuickLinks
        fetch("/data/images.json")
            .then((res) => res.json())
            .then((content) => setImage(content));
    }, []);

    return (
        <div>
            <section id="sec-landing" className="sec-landing">
                <FullSlide />
            </section>
            <section id="sec-gallery" className="sec-gallery">
                <GalleryContent images={image} />
            </section>
        </div>
    );
};

export default Page;
