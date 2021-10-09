import "./css/Footer.css";

const Component = (props) => {
    return (
        <div className="footer">
            <p>
                Made with <i className="fas fa-heart footer-heart" /> By{" "}
                <a href="https://mukherjeearnab.github.io/">Arnab Mukherjee</a>.
                <br /> &copy; {new Date().getFullYear()}
            </p>
        </div>
    );
};

export default Component;
