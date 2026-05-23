import { useEffect, useState } from "react";
import "../css/binary-rain.css";

export default function BinaryRain() {
    const [binary, setBinary] = useState("");

    useEffect(() => {
        function generateBinary(length = 4000) {
            let text = "";

            for (let i = 0; i < length; i++) {
                text += Math.random() > 0.5 ? "1" : "0";

                if (i % 120 === 0) {
                    text += "\n";
                }
            }

            return text;
        }

        const interval = setInterval(() => {
            setBinary(generateBinary());
        }, 350);

        return () => clearInterval(interval);
    }, []);

    return <div className="binary-rain">{binary}</div>;
}
