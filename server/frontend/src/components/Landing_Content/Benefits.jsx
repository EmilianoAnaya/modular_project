import './Benefits.css'

function Benefits() {
    const benefitsData = [
        {
            title: "Secure Medical Records",
            text: "All patient records are securely stored and encrypted, ensuring privacy and compliance with medical regulations.",
            img: "/assets/secure-records.jpg",
        },
        {
            title: "AI-Powered Diagnostics",
            text: "Our AI assists doctors in analyzing medical data faster and more accurately, supporting early diagnosis and better treatment planning.",
            img: "/assets/ai-diagnostics.jpg", 
        },
        {
            title: "Easy Access",
            text: "Authorized healthcare professionals can access records anytime, anywhere, improving collaboration and patient care.",
            img: "/assets/easy-access.jpg",
        },
        {
            title: "Time-Saving Automation",
            text: "Routine administrative tasks are automated, allowing doctors and staff to focus on what matters most: patient care",
            img: "/assets/automation.jpg", 
        },
        {
            title: "Detailed Reporting",
            text: "Generate comprehensive reports instantly, helping with medical research, audits, and patient follow-ups.",
            img: "/assets/reporting.jpg",
        },
    ];

    return (
        <div className="benefits-container">
            <h1>Benefits of MedTrackr</h1>

            {benefitsData.map((benefit, index) => (
                <section key={index} className={`benefit ${index % 2 === 0 ? 'left' : 'right'}`}>
                    {benefit.img && <img src={benefit.img} alt={benefit.title} />}
                    <div className="benefit-text">
                        <h2>{benefit.title}</h2>
                        <p>{benefit.text}</p>
                    </div>
                </section>

            ))}

            
        </div>
    )
}

export default Benefits
