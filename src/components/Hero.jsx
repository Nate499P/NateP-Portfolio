export default function Hero() {
  return (
    <section id="home" className="hero-section">
      <div className="hero-content">
        <p className="hero-tag">Portfolio / Digital Art / Web Design</p>
        <h1 className="hero-title">Welcome to My Portfolio</h1>

        <p className="hero-text">
          A showcase of my favorite visual projects, creative builds, and
          interactive web design work.
        </p>

        <div className="hero-buttons">
          <a href="#gallery" className="hero-btn primary">
            View Gallery
          </a>
          <a href="#contact" className="hero-btn secondary">
            Contact Me
          </a>
        </div>
      </div>

      <div className="hero-panel">
        <div className="hero-panel-inner">
          <img
            src="public/images/Wuken1.png"
            alt="Featured artwork"
            className="featured-image"
          />
          <h2>Featured Work</h2>
          <p>
            Highlight your strongest commission, design, or project here.
          </p>
        </div>
      </div>
    </section>
  );
}