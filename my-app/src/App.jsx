import { useState,useEffect,useRef} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // State to store messages
  const [messages, setMessages] = useState([
    { text: 'DALE TETE DAME UN INPUT', sender: 'bot' },
    { text: 'Respuesta del user', sender: 'user' },
  ]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
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

      setLoading(true);
      let botMessage = { text: '', sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, botMessage]);

      try {
        const response = await fetch('http://localhost:8000/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: messageText }),
        });

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          botMessage.text += chunk;

          setMessages((prevMessages) => [...prevMessages.slice(0, -1), { ...botMessage }]);
        }
      } catch (error) {
        botMessage.text = 'Error: Could not reach the server.';
        setMessages((prevMessages) => [...prevMessages.slice(0, -1), botMessage]);
      } finally {
        setLoading(false);
      }
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
        <input name="message" placeholder="Escribe tu mensaje..." />
        <button type="submit">Send</button>
      </form>
    </>
  );
}

export default App;
