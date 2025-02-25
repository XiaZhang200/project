import { useState } from 'react'
import './App.css'

 


function App() {
  
  // State to store messages
  const [messages, setMessages] = useState([
    { text: 'DALE TETE DAME UN INPUT', sender: 'bot' },
    { text: 'Respuesta del user', sender: 'user' },
  ]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const messageText = event.target.message.value.trim();

    if (messageText !== '') {
      // Clear input after sending
      event.target.message.value = '';

      // Add new message (user's message)
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: messageText, sender: 'user' },
      ]);

      // Optionally, add bot's response (example)
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'AI response to: ' + messageText, sender: 'bot' },
        ]);
      }, 1000);
    }
  };
  return (
    <>
      <header>
        <h1>LoLGPT</h1>
      </header>

        <main>
          <ul>
          {messages.map((message, index) => (
            <li key={index} className={`message ${message.sender}`}>
              <span>{message.sender === 'bot' ? 'AI' : 'User'}</span>
              <p>{message.text}</p>
            </li>
          ))}
          </ul>
        
        </main>
        <form onSubmit={handleSubmit}>
            <input name="message" placeholder="Escribe tu mensaje..."/>
            <button type="submit">Send</button>
        </form>

        <template id="message-template">
          <li className="message user">  
            <span> User</span>
            <p> Respuesta del user</p>
          </li>
        </template>
      
    </>
  )
  
}

export default App
