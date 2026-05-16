import { useEffect, useRef } from "react";
import "../css/cursor-follow.css";

export default function CursorFollow() {
    const orbRef = useRef(null);

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

            animationFrame = requestAnimationFrame(animate);
        }

        animate();

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrame);
        };
    }, []);

    return (
        <div ref={orbRef} className="cursor-orb">
            <div className="orb-eyes"></div>
        </div>
    );
}
