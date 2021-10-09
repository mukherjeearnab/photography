import "./css/LandingContent.css";

const Component = (props) => {
    return (
        <div className="landing-content">
            <h1>Arnab Mukherjee</h1>
            <p>Photography Enthusiast</p>
            <h3>
                <h2 className="landing-instagram">
                    <a href="https://instagram.com">
                        <i class="fab fa-instagram"></i>
                    </a>
                </h2>
                <p
                    onClick={() => {
                        document
                            .getElementById("sec-gallery")
                            .scrollIntoView({ behavior: "smooth", block: "start", inline: "start" });
                    }}
                >
                    <i class="fas fa-chevron-down"></i>
                </p>
            </h3>
        </div>
    );
};

export default Component;
