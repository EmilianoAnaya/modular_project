import './PatientLifeGuard.css'
import { useState, useRef, useEffect } from 'react';
import { usePatient } from '../../hooks/usePatient';
import { getApiUrl } from '../../config/api';
import API_CONFIG from '../../config/api';

function PatientLifeGuard(){
    const { patientData } = usePatient()
    const [expanded, setExpanded] = useState(false)
    const [input, setInput] = useState("")
    const [messages, setMessages] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    
    const messsagesEndRef = useRef(null)
    
    useEffect(() => {
      if(messsagesEndRef.current){
        messsagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, [messages])

    const sendMessage = async () => {
      const trimmedInput = input.trim()
      if (!trimmedInput || isLoading) return
      
      if (!patientData || !patientData.patient_id) {
        alert('Patient data not loaded')
        return
      }
      
      // Agregar mensaje del usuario
      const userMessage = { from: "user", text: trimmedInput }
      setMessages(prev => [...prev, userMessage])
      setInput("")
      setIsLoading(true)
      
      try {
        // Construir historial para la API (sin el mensaje actual)
        const conversationHistory = messages.map(msg => ({
          role: msg.from === 'user' ? 'user' : 'assistant',
          content: msg.text
        }))
        
        // Llamar a la API
        const response = await fetch(
          getApiUrl(`${API_CONFIG.ENDPOINTS.AI_CHAT}`),
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              patient_id: patientData.patient_id,
              message: trimmedInput,
              history: conversationHistory
            })
          }
        )
        
        if (!response.ok) {
          throw new Error('Failed to get response from chatbot')
        }
        
        const data = await response.json()
        
        // Agregar respuesta de la IA
        setMessages(prev => [
          ...prev,
          { from: "ai", text: data.response }
        ])
        
      } catch (error) {
        console.error('Chatbot error:', error)
        setMessages(prev => [
          ...prev,
          { from: "ai", text: "Lo siento, hubo un error al procesar tu mensaje. Por favor intenta de nuevo." }
        ])
      } finally {
        setIsLoading(false)
      }
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
                        <p>Start a Conversation with the powerful Lifeguard!</p>
                        <p style={{fontSize: '0.8em', color: '#666'}}>
                          I can help you with information about your medical history, allergies, medications, and more.
                        </p>
                      </div>
                    ) }
                    
                    
                    { messages.map((msg, i) => (
                      <div key={i} className={`lifeguard-ballon ${msg.from === "ai" ? "ballon-left" : "ballon-right"}`}>
                        { msg.text }
                      </div>
                    )) }
                    
                    {/* Indicador de carga */}
                    {isLoading && (
                      <div className="lifeguard-ballon ballon-left" style={{fontStyle: 'italic', color: '#666'}}>
                        Thinking...
                      </div>
                    )}
                    
                    <div ref={messsagesEndRef} />
                </div>

                <div className='lifeguard-input-cont' onBlur={() => setExpanded(false)} onFocus={() => setExpanded(true)}>
                    <textarea 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleEnter}
                        placeholder="Write a message..."
                        disabled={isLoading}
                    />
                    <img 
                        src='/assets/arrow-up.svg' 
                        onClick={() => sendMessage()}
                        style={{
                          opacity: isLoading ? 0.5 : 1,
                          cursor: isLoading ? 'not-allowed' : 'pointer'
                        }}
                    />
                </div>
            </div>
        </>
    )
}

export default PatientLifeGuard