import { motion } from "framer-motion";
import "../css/RibbonTicker.css";

export default function RibbonTicker() {
    const blends = ["Javascript", "HTML", "CSS", "Front-end Development", "React"];

    const items = [...blends, ...blends, ...blends, ...blends];

    return (
        <div className="ribbon-ticker-container">
            <div className="ribbon-ticker">
                <div className="ribbon-track">
                    {items.map((name, i) => (
                        <motion.span
                            key={i}
                            className="ribbon-item"
                            whileHover={{
                                scale: 1.2,
                                color: "#f0b955",
                                cursor: "pointer"
                            }}
                            transition={{ type: "spring", stiffness: 300 }}>
                            {name} <span className="ribbon-dot"></span>
                        </motion.span>
                    ))}
                </div>
            </div>
        </div>
    );
}
