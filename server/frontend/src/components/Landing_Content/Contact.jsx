import './Contact.css'

function Contact() {
    return (
        <div className='contact-container fade-in'>
            <h1>Contact Us</h1>
            <p className='contact-intro'>
                Have questions, feedback, or partnership inquiries?
                Send us a message and we'll get back to you shortly.
            </p>

            <form className='contact-form'>
                <div className='form-group'>
                    <label htmlFor="name">Full Name</label>
                    <input type="text" name="name" id="name"  placeholder='Enter your name' required/>
                </div>

                <div className='form-group'>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" name="email" id="email" placeholder='Enter your email' required/>
                </div>

                <div className='form-group'>
                    <label htmlFor="subject">Subject</label>
                    <input type="text" name="subject" id="subject" placeholder='How can we help you?' required/>
                </div>

                <div className='form-group'>
                    <label htmlFor="message">Message</label>
                    <input type="text" name="message" id="message" placeholder='Write your message here...' required/>
                </div>

                <button type='submit' className='submit-btn'>Send Message</button>
            </form>
        </div>
    )
}

export default Contact