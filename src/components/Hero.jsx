import BinaryRain from "./binary-rain";
import "../css/binary-rain.css";

export default function Hero({ pelletsEaten }) {
    return (
        <section id="home" className="hero-section">
            <div className="hero-content">
                <BinaryRain />

                <div className="hero-content-inner">
                    <p className="hero-tag">Portfolio / Digital Art / Web Design</p>

                    <h1 className="hero-title">Welcome to My Portfolio</h1>

                    <p className="hero-text">
                        A showcase of my favorite visual projects, creative builds, and interactive
                        web design work.
                    </p>

                    <div className="hero-buttons">
                        <a href="#gallery" className="hero-btn primary">
                            View Gallery
                        </a>

                        <a href="#contact" className="hero-btn secondary">
                            Contact Me
                        </a>

                        <a href="#index" className="hero-btn additional">
                            Commission Info
                        </a>

                        <div className="score-board">
                            <span className="score-label">Pellets Eaten</span>
                            <span className="score-value">
                                {pelletsEaten.toString().padStart(6, "0")}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="hero-panel">
                <BinaryRain />

                <div className="hero-panel-inner">
                    <img
                        src="public/images/Wuken1.png"
                        alt="Placeholder"
                        className="featured-image"
                    />

                    <h2>Featured Work</h2>

                    <p>Highlight of my strongest commissions, designs, or projects here.</p>
                </div>
            </div>
        </section>
    );
}
