import "./css/carousel-style.css"
import "./css/Hero.css";
import "./css/navbar.css";;

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedCarousel from "./components/FeaturedCarousel";
import About from "./components/About";
import Contact from "./components/Contact";

export default function App() {
  return (
    <>
      <Navbar />

      <main className="page-shell">
        <Hero />
        <FeaturedCarousel />
        <About />
        <Contact />
      </main>
    </>
  );
}