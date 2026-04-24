// components/FeaturedCarousel.jsx
import { useEffect, useMemo, useRef, useState } from "react";


const imageFiles = [
    "Wuken1.png",
    "Wuken2.png",
    "Wuken3.png",
    "Wuken4.png",
    "Wuken5.png",
    "Wuken6.png",
    "Wuken7.png",
    "Wuken8.jpg",
    "Wuken9.png",
    "Wuken10.jpg",
    "Wuken11.jpg",
    "Wuken12.jpg",
    "Wuken13.png",
    "Wuken14.png",
    "Wuken15.jpg"
];

export default function FeaturedCarousel() {
    const rowRef = useRef(null);
    const intervalRef = useRef(null);

    const [startIndex, setStartIndex] = useState(0);
    const [direction, setDirection] = useState(null);
    const [phase, setPhase] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [noTransition, setNoTransition] = useState(false);

    const cards = useMemo(() => {
        return imageFiles.map((fileName) => {
            const title = fileName
                .replace(/\.[^/.]+$/, "")
                .replace(/\d+/g, "")
                .replace(/([a-z])([A-Z])/g, "$1 $2")
                .replace(/^\w/, (c) => c.toUpperCase())
                .trim();

            return {
                title,
                subtitle: "Commission",
                image: `/images/${fileName}`
            };
        });
    }, []);

    const visibleCards = useMemo(() => {
        return Array.from({ length: 12 }, (_, i) => {
            const cardIndex = (startIndex - 1 + i + cards.length) % cards.length;
            return cards[cardIndex];
        });
    }, [startIndex, cards]);

    function getSizeClass(i) {
        if (i === 0 || i === 6) return "buffer";
        if (i === 1 || i === 5) return "small";
        return "large";
    }

    function animateShift(newDirection) {
        if (isAnimating) return;

        setIsAnimating(true);
        setDirection(newDirection);
        setPhase("shrinking");
    }

    function nextCards() {
        animateShift("next");
    }

    function prevCards() {
        animateShift("prev");
    }

    function startRotation() {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            nextCards();
        }, 5000);
    }

    function resetRotation() {
  clearInterval(intervalRef.current);

  intervalRef.current = setInterval(() => {
    nextCards();
  }, 5000);
}

    useEffect(() => {
        startRotation();
        return () => clearInterval(intervalRef.current);
    }, [isAnimating]);

    function handleTransitionEnd(e) {
        if (!isAnimating) return;

        if (phase === "shrinking" && (e.propertyName === "width" || e.propertyName === "height")) {
            setPhase("sliding");
            return;
        }

        if (phase === "sliding" && e.propertyName === "transform") {
            setStartIndex((prev) =>
                direction === "next"
                    ? (prev + 1) % cards.length
                    : (prev - 1 + cards.length) % cards.length
            );

            setNoTransition(true);
            setPhase("resetting");

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setNoTransition(false);
                    setPhase("growing");
                });
            });

            return;
        }

        if (phase === "growing" && (e.propertyName === "width" || e.propertyName === "height")) {
            setIsAnimating(false);
            setDirection(null);
            setPhase(null);
            setNoTransition(false);
        }
    }

    const rowClasses = [
        "row-layer",
        phase === "shrinking" || phase === "sliding" || phase === "resetting" ? "uniform" : "",
        phase === "sliding" && direction === "next" ? "sliding-next" : "",
        phase === "sliding" && direction === "prev" ? "sliding-prev" : "",
        noTransition ? "no-transition" : ""
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <section id="gallery" className="featured-carousel">
            <button className="nav prev" onClick={prevCards}>
                ‹
            </button>
            <div
                className="carousel-mask"
                onMouseEnter={() => clearInterval(intervalRef.current)}
                onMouseLeave={startRotation}>
                <div
                    id="currentRow"
                    ref={rowRef}
                    className={rowClasses}
                    onTransitionEnd={handleTransitionEnd}>
                    {visibleCards.map((card, i) => (
                        <div className={`slot ${getSizeClass(i)}`} key={`${card.image}-${i}`}>
                            <div className="card-inner">
                                <img src={card.image} alt={card.title} />
                                <div className="card-overlay">
                                    <h3>{card.title}</h3>
                                    <p>{card.subtitle}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <button className="nav next" onClick={nextCards}>
                ›
            </button>
        </section>
    );
}
