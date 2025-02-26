import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // State to store messages
  const [messages, setMessages] = useState([
    { text: 'DALE TETE DAME UN INPUT', sender: 'bot' },
    { text: 'Respuesta del user', sender: 'user' },
  ]);

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

      try {
        const response = await axios.post('http://localhost:8000/chat', {
          prompt: messageText,
        });

        setMessages((prevMessages) => [
          ...prevMessages,
          { text: response.data.response, sender: 'bot' },
        ]);
      } catch (error) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'Error: Could not reach the server.', sender: 'bot' },
        ]);
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
