import "../css/Certification.css";
import "../css/Certification.css";
import BinaryRain from "./binary-rain";

const certifications = [
    {
        title: "CoITB HTML5 & CSS3 Certification",
        issuer: "CoITB",
        image: "/images/HTMLCSS_Cert.png",
        status: "Active"
    },
    {
        title: "CoITB JavaScript Certification",
        issuer: "CoITB",
        image: "/images/JavaScript_Cert.png",
        status: "Active"
    },
    {
        title: "Secret Clearance",
        issuer: "U.S. Government",
        image: "/images/clearance.png",
        status: "Current"
    },
    {
        title: "AC/DC Certification",
        issuer: "U.S. Government",
        image: "/images/ACDC_Cert.png",
        status: "Current"
    }
];

export default function Certification() {
    return (
        <section id="certification" className="content-section">
            <div className="content-card">
            <BinaryRain />
                <h2>Certifications</h2>
                <p>
                    These are my current certifications and clearances. I am always looking to
                    expand my skill set and add more certifications in the future.
                </p>

                <div className="cert-grid">
                    {certifications.map((cert, index) => (
                        <div className="cert-card" key={index}>
                            <img src={cert.image} alt={cert.title} className="cert-image" />

                            <div className="cert-info">
                                <h3>{cert.title}</h3>
                                <p>{cert.issuer}</p>
                                <span>{cert.status}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
