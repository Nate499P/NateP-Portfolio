import "./css/carousel-style.css";
import "./css/Hero.css";
import "./css/navbar.css";
import "./css/cursor-follow.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedCarousel from "./components/FeaturedCarousel";
import About from "./components/About";
import Contact from "./components/Contact";
import RibbonTicker from "./components/RibbonTicker";
import Certification from "./components/Certificates";
import CursorFollow from "./components/CursorFollow";

import { useState } from "react";

export default function App() {
    const [pelletsEaten, setPelletsEaten] = useState(0);

    return (
        <>
            <Navbar />

            <main className="page-shell">
                <Hero pelletsEaten={pelletsEaten} />
                <CursorFollow setPelletsEaten={setPelletsEaten} />
                <RibbonTicker />
                <FeaturedCarousel />
                <About />
                <Certification />
                <Contact />
            </main>
        </>
    );
}
