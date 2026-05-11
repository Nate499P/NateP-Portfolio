// components/FeaturedCarousel.jsx
import { useEffect, useMemo, useRef, useState } from "react";

const imageFiles = [
    "Placeholder1",
    "Placeholder2",
    "Placeholder3",
    "Placeholder4",
    "Placeholder5",
    "Placeholder6",
    "Placeholder7",
    "Placeholder8",
    "Placeholder9",
    "Placeholder10",
    "Placeholder11",
    "Placeholder12",
    "Placeholder13",
    "Placeholder14",
    "Placeholder15"
];

export default function FeaturedCarousel() {
    const rowRef = useRef(null);
    const intervalRef = useRef(null);

    const [startIndex, setStartIndex] = useState(0);
    const [direction, setDirection] = useState(null);
    const [phase, setPhase] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [noTransition, setNoTransition] = useState(false);

    const [isMobile, setIsMobile] = useState(false);

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

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const visibleCards = useMemo(() => {
        const amount = isMobile ? 3 : 12;

        return Array.from({ length: amount }, (_, i) => {
            const offset = isMobile ? startIndex + i : startIndex - 1 + i;
            const cardIndex = (offset + cards.length) % cards.length;
            return cards[cardIndex];
        });
    }, [startIndex, cards, isMobile]);

    function getSizeClass(i) {
        if (isMobile) {
            if (i === 1) return "large";
            return "small";
        }

        if (i === 0 || i === 6) return "buffer";
        if (i === 1 || i === 5) return "small";
        return "large";
    }

    function animateShift(newDirection) {
        if (isAnimating) return;

        if (isMobile) {
            setStartIndex((prev) =>
                newDirection === "next"
                    ? (prev + 1) % cards.length
                    : (prev - 1 + cards.length) % cards.length
            );
            return;
        }

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
        startRotation();
    }

    useEffect(() => {
        startRotation();
        return () => clearInterval(intervalRef.current);
    }, []);

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
                onMouseLeave={resetRotation}>
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
