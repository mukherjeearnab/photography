import { useEffect } from "react";

import "./css/FullSlide.css";

import LandingContent from "./LandingContent";

const Component = (props) => {
    useEffect(() => {
        if (props.frames.length > 2) {
            let key = Math.floor(Math.random() * props.frames.length) + 1;

            // Initial Run
            swtichFrame(key);
            key++;

            // Interval Sequence
            const interval = setInterval(() => {
                swtichFrame(key);
                key++;
            }, 5000);
            return () => clearInterval(interval);
        }
    });

    const swtichFrame = (key) => {
        document.querySelector(`#frame-0-${key % props.frames.length}`).style.opacity = 100;
        document.querySelector(`#frame-0-${(key === 0 ? 1 : key - 1) % props.frames.length}`).style.opacity = 0;
    };

    const frameRunner = (index, sequencer) => {
        const key = (index + sequencer) % props.frames.length;
        const delay = 0.5 * sequencer;

        return (
            <li key={index}>
                <span
                    style={{
                        zIndex: key,
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)), url(${props.frames[index].src})`,
                        transitionDelay: `${delay}s`,
                    }}
                    id={`frame-${sequencer}-${key}`}
                ></span>
            </li>
        );
    };

    return (
        <div className="full-slide-bg">
            <div className="col-sm-4 col-12 photo-box">
                <ul className="cb-slideshow">{props.frames.map((_, index) => frameRunner(index, 0))}</ul>
                <LandingContent />
            </div>
        </div>
    );
};

export default Component;
