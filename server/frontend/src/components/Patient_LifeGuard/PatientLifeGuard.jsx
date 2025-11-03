import './PatientLifeGuard.css'
import { useState, useRef, useEffect } from 'react';

function PatientLifeGuard(){
    const [expanded, setExpanded] = useState(false)
    const [input, setInput] = useState("")
    const [messages, setMessages] = useState([])
    
    const messsagesEndRef = useRef(null)
    
    useEffect(() => {
      if(messsagesEndRef.current){
        messsagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, [messages])

    const sendMessage = () => {
      const trimmedInput = input.trim()
      if (!trimmedInput) return
      
      const newMessages = [...messages, { from: "user", text:trimmedInput}]
      setMessages(newMessages)
      setInput("")
      
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { from: "ai", text: "Got it! You said: " + trimmedInput }
        ]);
      }, 600);
    }
    
    const handleEnter = (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        sendMessage()
      }
    }
    
    return(
        <>
            <div className={`patient-lifeguard-cont ${expanded ? 'expanded' : ""}`}>
                <div className={`lifeguard-text-cont ${messages.length === 0 ? 'lifeguard-presentation' : ""}`}>
                    { messages.length === 0 && (
                      <div className='lifeguard-presentation-content'>
                        <img src='/assets/bot.svg' />
                        <p>Start a Conversation with the powerfull Lifeguard!</p>
                      </div>
                    ) }
                    
                    
                    { messages.map((msg, i) => (
                      <div key={i} className={`lifeguard-ballon ${msg.from === "ai" ? "ballon-left" : "ballon-right"}`}>
                        { msg.text }
                      </div>
                    )) }
                    <div ref={messsagesEndRef} />
                </div>

                <div className='lifeguard-input-cont' onBlur={() => setExpanded(false)} onFocus={() => setExpanded(true)}>
                    <textarea 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleEnter}
                        placeholder="Write a message..."
                    />
                    <img src='/assets/arrow-up.svg' 
                        onClick={() => sendMessage()}
                    />
                </div>
            </div>
        </>
    )
}

export default PatientLifeGuard