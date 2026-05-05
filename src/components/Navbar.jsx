// components/Navbar.jsx
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const [active, setActive] = useState("Home");
  const [blink, setBlink] = useState(false);
  const [squint, setSquint] = useState(false);

  const navCenterRef = useRef(null);
  const glowRef = useRef(null);
  const linkRefs = useRef({});

  const links = [
    { label: "Home", href: "#" },
    { label: "About Me", href: "#about" },
    { label: "More Info", href: "#info" },
  ];

  function moveGlow(label) {
    const target = linkRefs.current[label];
    const glow = glowRef.current;
    const parent = navCenterRef.current;

    if (!target || !glow || !parent) return;

    const parentRect = parent.getBoundingClientRect();
    const rect = target.getBoundingClientRect();

    glow.style.width = `${rect.width}px`;
    glow.style.left = `${rect.left - parentRect.left}px`;
    glow.style.opacity = "1";
  }

  useEffect(() => {
    moveGlow(active);
  }, [active]);

  useEffect(() => {
    let idleTimer;
    let blinkTimer;

    const resetIdle = () => {
      clearTimeout(idleTimer);
      clearTimeout(blinkTimer);

      idleTimer = setTimeout(() => {
        const startBlink = () => {
          setBlink(true);
          setTimeout(() => setBlink(false), 250);

          blinkTimer = setTimeout(startBlink, Math.random() * 3000 + 1500);
        };

        startBlink();
      }, 2000);
    };

    document.addEventListener("mousemove", resetIdle);
    resetIdle();

    return () => {
      document.removeEventListener("mousemove", resetIdle);
      clearTimeout(idleTimer);
      clearTimeout(blinkTimer);
    };
  }, []);

  useEffect(() => {
    const handleCardOver = (e) => {
      if (e.target.closest(".slot")) setSquint(true);
    };

    const handleCardOut = (e) => {
      if (e.target.closest(".slot")) setSquint(false);
    };

    document.addEventListener("mouseover", handleCardOver);
    document.addEventListener("mouseout", handleCardOut);

    return () => {
      document.removeEventListener("mouseover", handleCardOver);
      document.removeEventListener("mouseout", handleCardOut);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      document.querySelectorAll(".eye").forEach((eye) => {
        const pupil = eye.querySelector(".pupil");
        if (!pupil) return;

        const rect = eye.getBoundingClientRect();
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;

        const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
        const maxDistance = 10;

        const x = Math.cos(angle) * maxDistance;
        const y = Math.sin(angle) * maxDistance;
        const scale = eye.classList.contains("squint") ? 0.8 : 1;

        pupil.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`;
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <nav
      className="navbar">
      <div className="nav-eyes">
        <div className={`eye ${blink ? "blink" : ""} ${squint ? "squint" : ""}`}>
          <div className="pupil" />
        </div>
        <div className={`eye ${blink ? "blink" : ""} ${squint ? "squint" : ""}`}>
          <div className="pupil" />
        </div>
      </div>

      <div
        className="nav-center"
        ref={navCenterRef}
        onMouseLeave={() => moveGlow(active)}
      >
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            ref={(el) => {
              linkRefs.current[link.label] = el;
            }}
            className={`nav-link ${active === link.label ? "active" : ""}`}
            onMouseEnter={() => moveGlow(link.label)}
            onClick={() => setActive(link.label)}
          >
            {link.label}
          </a>
        ))}

        <div className="nav-hover-glow" ref={glowRef} />
      </div>

      <button className="menu-toggle">☰</button>
    </nav>
  );
}