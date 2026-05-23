import { useEffect, useRef, useState } from "react";
import "../css/cursor-follow.css";

const PELLET_COUNT = 45;
const EAT_DISTANCE = 45;

function getSafePosition() {
    const forbiddenZones = Array.from(
        document.querySelectorAll(
            ".navbar, nav, .hero-section, .hero-panel, .featured-carousel, .carousel-mask, .content-section, .content-card, .ribbon-ticker-container, .logo"
        )
    ).map((el) => {
        const rect = el.getBoundingClientRect();

        return {
            left: rect.left,
            right: rect.right,
            top: rect.top,
            bottom: rect.bottom
        };
    });

    let x,
        y,
        valid = false;

    while (!valid) {
        x = Math.random() * window.innerWidth;
        y = Math.random() * window.innerHeight;

        valid = !forbiddenZones.some(
            (zone) =>
                x > zone.left - 40 &&
                x < zone.right + 40 &&
                y > zone.top - 40 &&
                y < zone.bottom + 40
        );
    }

    return { x, y };
}

export default function CursorFollow({ setPelletsEaten }) {
    const orbRef = useRef(null);
    const pelletsRef = useRef([]);
    const [pellets, setPellets] = useState([]);

    useEffect(() => {
        pelletsRef.current = pellets;
    }, [pellets]);

    useEffect(() => {
        let created = 0;

        const interval = setInterval(() => {
            created++;

            const pos = getSafePosition();

            setPellets((prev) => [
                ...prev,
                {
                    id: created,
                    x: pos.x,
                    y: pos.y,
                    eaten: false
                }
            ]);

            if (created >= PELLET_COUNT) {
                clearInterval(interval);
            }
        }, 120);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;

        let currentX = mouseX;
        let currentY = mouseY;

        let animationFrame;

        function handleMouseMove(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        }

        window.addEventListener("mousemove", handleMouseMove);

        function animate() {
            currentX += (mouseX - currentX) * 0.06;
            currentY += (mouseY - currentY) * 0.06;

            if (orbRef.current) {
                const offsetX = -60;
                const offsetY = 20;
                const dx = mouseX - currentX;
                const angle = dx * 0.08;

                orbRef.current.style.transform = `
          translate(${currentX + offsetX}px, ${currentY + offsetY}px)
          rotate(${angle}deg)
        `;
            }

            const orbCenterX = currentX - 25;
            const orbCenterY = currentY + 50;

            const eatenPellets = pelletsRef.current.filter((pellet) => {
                if (pellet.eaten) return false;

                const distance = Math.hypot(pellet.x - orbCenterX, pellet.y - orbCenterY);

                return distance < EAT_DISTANCE;
            });

            if (eatenPellets.length > 0) {
                const eatenIds = new Set(eatenPellets.map((p) => p.id));

                setPelletsEaten((count) => count + eatenPellets.length);

                setPellets((prev) =>
                    prev.map((pellet) => {
                        if (!eatenIds.has(pellet.id)) return pellet;

                        setTimeout(() => {
                            const pos = getSafePosition();

                            setPellets((current) =>
                                current.map((p) =>
                                    p.id === pellet.id
                                        ? {
                                              ...p,
                                              x: pos.x,
                                              y: pos.y,
                                              eaten: false
                                          }
                                        : p
                                )
                            );
                        }, 2000);

                        return {
                            ...pellet,
                            eaten: true
                        };
                    })
                );
            }

            animationFrame = requestAnimationFrame(animate);
        }

        animate();

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrame);
        };
    }, [setPelletsEaten]);

    return (
        <>
            <div className="pellet-layer">
                {pellets.map((pellet) => (
                    <span
                        key={pellet.id}
                        className={`cursor-pellet ${pellet.eaten ? "eaten" : ""}`}
                        style={{
                            left: `${pellet.x}px`,
                            top: `${pellet.y}px`
                        }}
                    />
                ))}
            </div>

            <div ref={orbRef} className="cursor-orb">
                <div className="orb-eyes"></div>
            </div>
        </>
    );
}
