import "./css/carousel-style.css"
import "./css/Hero.css";
import "./css/navbar.css";;
import "./css/cursor-follow.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedCarousel from "./components/FeaturedCarousel";
import About from "./components/About";
import Contact from "./components/Contact";
import RibbonTicker from "./components/RibbonTicker";
import Certification from "./components/Certificates";
import CursorFollow from "./components/CursorFollow";

export default function App() {
  return (
    <>
      <Navbar />
      <CursorFollow />

      <main className="page-shell">
        <Hero />
        <RibbonTicker />
        <FeaturedCarousel />
        <About />
        <Certification />
        <Contact />
      </main>
    </>
  );
}