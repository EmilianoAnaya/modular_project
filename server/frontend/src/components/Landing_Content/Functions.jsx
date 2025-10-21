import './Functions.css'

    function Functions() {
        const functionsData = [
            {
                title: "Patient Record Management",
                text: "Easily create, update, and manage patient medical records with a user-friendly interface.",
                img: "/assets/patient-record-management.jpg",
            },
            {
                title: "AI Diagnostics Support",
                text: "Use artificial intelligence to assist in diagnosing conditions by analyzing patient data and medical history.",
                img: "/assets/AI-diagnostics-support.jpg",
            },
            {
                title: "Data Sharing & Collaboration",
                text: "Securely share patient records with authorized healthcare professionals to improve teamwork and care quality.",
                img: "",
            },
            {
                title: "Automated Reminders",
                text: "Send ",
                img: "",
            },
            {
                title: "Analytics & Reports",
                text: "Generate detailed analytics and medical reports instantly, supporting better research and decision-making",
                img: "",
            },
        ]

    return (
        <div className="functions-container">
            <h1>Main Functions of MedTrackr</h1>
            {functionsData.map((func, index) => (
                <section key={index} className={`function ${index % 2 === 0 ? 'left' : 'right'}`}>
                    {func.img && <img src={func.img} alt={func.title} />}
                    <div className="function-text">
                        <h2>{func.title}</h2>
                        <p>{func.text}</p>
                    </div>
                </section>
            ))}
        </div>
    )
}

export default Functions