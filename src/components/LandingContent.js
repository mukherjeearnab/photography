import "./css/LandingContent.css";

const Component = (props) => {
    return (
        <div className="landing-content">
            <h1>Arnab Mukherjee</h1>
            <p>Photography Enthusiast</p>
            <h3>
                <p className="landing-instagram">
                    <a target="blank" href="https://www.instagram.com/arnabm99/">
                        <i className="fab fa-instagram"></i>
                    </a>
                </p>
                <p
                    onClick={() => {
                        document
                            .getElementById("sec-gallery")
                            .scrollIntoView({ behavior: "smooth", block: "start", inline: "start" });
                    }}
                >
                    <i className="fas fa-chevron-down"></i>
                </p>
            </h3>
        </div>
    );
};

export default Component;
